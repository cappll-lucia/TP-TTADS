import { prisma } from '$lib/server/lucia/prisma';
import { auth } from '$lib/server/lucia/lucia';
import { LuciaError } from 'lucia-auth';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from '../$types';
import { util, z, ZodError } from 'zod';
import { notifyResetPasswordLink } from '$lib/server/email/emailService';
import { validateResetPasswordToken } from '$lib/server/tokens';
import { resetPasswordSchema } from './resetPasswordSchema';

export const load: PageServerLoad = async ({ url }) => {

}

export const actions: Actions = {
    default: async ({ request, params, locals }: any) => {
        const formData = Object.fromEntries(await request.formData()) as Record<string, string>;
        try {
            //throw new Error(" dsf");
            const { password } = resetPasswordSchema.parse(formData);
            const token = params.token;
            const userId = await validateResetPasswordToken(token);
            let user = await prisma.authUser.findUnique({
                where: {
                    id: userId
                }
            })
            if (!user) return {
                data: { ...formData },
                error: ''
            }
            await auth.updateKeyPassword("email", user.email, password);
            return { success: true }

        } catch (err) {
            console.log(err)
            if (err instanceof ZodError) {
                const { fieldErrors: errors } = err.flatten();
                return {
                    data: { ...formData },
                    errors
                };
            } else if (err instanceof Error && (err?.message === 'INVALID_TOKEN' || err?.message === 'EXPIRED_TOKEN')) {
                return {
                    data: { ...formData },
                    message: err?.message
                }
            } else {
                return {
                    data: { ...formData },
                    message: 'RESET_PASSWORD_FAILED'
                }
            }
        }
    }
}
