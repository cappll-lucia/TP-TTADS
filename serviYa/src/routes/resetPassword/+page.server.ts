import { prisma } from '$lib/server/lucia/prisma';
import { LuciaError } from 'lucia-auth';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from '../$types';
import { z, ZodError } from 'zod';
import { notifyResetPasswordLink } from '$lib/server/email/emailService';
import {generateResetPasswordToken } from '$lib/server/tokens';

const emailSchema = z
	.object({
		email: z.string({ required_error: 'Ingrese su email' }).email({ message: 'Ingrese un email válido' })
	});

export const load: PageServerLoad = async ({locals}) =>{
    const session = await locals.auth.validate();
    if(session){
        throw redirect(302, '/');
    }   
}

export const actions: Actions = {
    default: async({request, locals})=>{
        const formData = Object.fromEntries(await request.formData()) as Record<string, string>;        
        try {
                const {email} = emailSchema.parse(formData);
                const user = await prisma.authUser.findUnique({
                    where: {
                        email: email
                    }
                })
                if(user) {
                    const token_value = await generateResetPasswordToken(user.id);
                    await notifyResetPasswordLink({to: email, clientName: user.name, token: token_value});
                    return { success: true}
                }else{
                    throw new LuciaError('AUTH_INVALID_SESSION_ID');
                }                
            } catch (err) {
                if (err instanceof LuciaError) {
                    return fail(401, {
                        email: formData.email,
                        message:'AUTH_INVALID_SESSION_ID'
                    });
                }else if (err instanceof ZodError) {
                    const { fieldErrors: errors } = err.flatten();
                    return {
                        data: { ...formData },
                        errors
                    };
                } else {
                    return {
                        message: 'No se pudo registrar al usuario'
                    };
                }
            }
        }
}