import { auth } from '$lib/server/lucia/lucia';
import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { ZodError } from 'zod';
import { editmeSchema } from './editmeSchema';
import { put } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';
import { prisma } from '$lib/server/lucia/prisma';

export const load: PageServerLoad = async ({ locals }) => {
	const { session, user } = await locals.auth.validateUser();
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
			const { name, city_id } = editmeSchema.parse(formData);
			const file = formData.file as unknown as File;
			if (file.size != 0) {
				const { url } = await put(file.name, file, {
					token: BLOB_READ_WRITE_TOKEN,
					access: 'public'
				});
				await prisma.authUser.update({
					where: {
						id: user.userId
					},
					data: {
						name,
						city_id: city_id,
						url_photo: url
					}
				});
			} else {
				await prisma.authUser.update({
					where: {
						id: user.userId
					},
					data: {
						name,
						city_id: city_id,
						url_photo: undefined
					}
				});
			}
		} catch (error) {
			console.log(error);
			if (error instanceof ZodError) {
				const { fieldErrors: errors } = error.flatten();
				delete formData.file;
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
