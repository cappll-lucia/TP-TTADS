import { auth } from '$lib/server/lucia/lucia';
import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { ZodError } from 'zod';
import { editmeSchema } from './editmeSchema';
import { prisma } from '$lib/server/lucia/prisma';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) {
		throw redirect(302, '/');
	}
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const { user } = await locals.auth.validateUser();
		if (!user) {
			return error(401, 'Unauthorized');
		}
		const formData = Object.fromEntries(await request.formData()) as Record<string, string>;
		try {
			const { name } = editmeSchema.parse(formData);
			await prisma.authUser.update({
				where: {
					id: user.userId
				},
				data: {
					name
				}
			});
		} catch (error) {
			if (error instanceof ZodError) {
				const { fieldErrors: errors } = error.flatten();
				return {
					data: { ...formData },
					errors
				};
			} else {
				return {
					message: 'No se pudo editar el usuario'
				};
			}
		}
	}
};
