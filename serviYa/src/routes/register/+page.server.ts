import { auth } from "$lib/server/lucia";
import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import {z} from 'zod';
import { ZodError } from "zod";

const registerSchema = z.object({
    name: z.string({required_error: 'Ingrese su nombre'}).min(1,{message: 'Ingrese su nombre'}).max(50, {message: 'Ingrese hasta 50 caracteres'}).trim(),
    username: z.string({required_error: 'Ingrese su nombre de usuario'}).min(1, {message: 'Ingrese su nombre de usuario'}).max(20, {message: 'El nombre de usuario puede tener hasta 20 caracteres'}),
    password: z.string({required_error: 'Ingrese su contraseña'}).min(6, {message: 'La contraseña debe tener al menos 6 caracteres'}).max(20, {message: 'La contraseña puede tener hasta 20 caracteres'}).trim(),
    confirmPassword: z.string({required_error: 'Confirme su contraseña'}).min(6, {message: 'La contraseña debe tener al menos 6 caracteres'}).max(20, {message: 'La contraseña puede tener hasta 20 caracteres'}).trim(),
    email:z.string({required_error: 'Ingrese su email'}).min(1, {message: 'Ingrese su email'}).email({message:'Ingrese un email válido'})
}).superRefine(({password, confirmPassword}, context )=>{
    if(password !== confirmPassword){
        context.addIssue({
            code:'custom',
            message:'Las contraseñas no coinciden',
            path: ['confirmPassword']
        })
    }
})

export const load: PageServerLoad = async ({ locals }) => {
    const session =await locals.auth.validate()
    if (session){
        throw redirect(302, '/')
    }
};

export const actions: Actions ={
    default: async({request})=>{
        const formData = Object.fromEntries(await request.formData()) as Record  < string, string >
        const {name, username, password, email} = formData
        try{
            const result = registerSchema.parse(formData);
            await auth.createUser({
                primaryKey:{
                    providerId:'username',
                    providerUserId: username,
                    password
                },
                attributes:{
                    name,
                    email,
                    username,
                }
            })
        }catch(error){
            if( error instanceof ZodError ){
                const {fieldErrors: errors} = error.flatten();
                // const { confirmPassword, ...others} =  formData;
                return{
                    data: {...formData},
                    errors
                }
            }else{
                console.log(error)
                return{
                    message: 'No se pudo registrar al usuario'
                }
            }
            return fail(400, {message: 'Could not register user'})
        }
        throw redirect(302, '/login')
    }
}

