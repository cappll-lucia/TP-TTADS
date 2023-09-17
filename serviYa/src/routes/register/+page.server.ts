import { auth } from '$lib/server/lucia/lucia';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { ZodError } from 'zod';
import { registerSchema } from './registerSchema';
import type { FormResponse } from '../../types';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (session) {
		throw redirect(302, '/');
	}
};

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData()) as Record<string, string>;
		try {
			const { name, password, email } = registerSchema.parse(formData);

			await auth.createUser({
				primaryKey: {
					providerId: 'email',
					providerUserId: email,
					password
				},
				attributes: {
					name,
					email,
					role: 'USER'
				}
			});
		} catch (error) {
			if (error instanceof ZodError) {
				const { fieldErrors: errors } = error.flatten();
				return {
					data: { ...formData },
					errors
				} satisfies FormResponse;
			} else {
				console.log(error);
				return {
					data: { ...formData },
					message: 'No se pudo registrar al usuario'
				} satisfies FormResponse;
			}
		}
		throw redirect(302, '/login');
	}
};
