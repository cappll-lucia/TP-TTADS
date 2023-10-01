import { auth } from '$lib/server/lucia/lucia';
import { LuciaError } from 'lucia-auth';
import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { prisma } from '$lib/server/lucia/prisma';

export const load: PageServerLoad = async ({ locals, params }) => {
	const { user, session } = await locals.auth.validateUser();
	const id = params.id;
	if (!id) {
		return fail(400, { message: 'Invalid request' });
	}
	const service = await prisma.service.findUnique({
		where: { id: id }
	});
	if (!service) {
		return fail(404, { message: 'No se encontro el Id' });
	}

	/* if (session && user.role !== 'ADMIN') {
		throw redirect(302, '/');
	} */
	return { service };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const { id, name, img } = Object.fromEntries(await request.formData()) as Record<
			string,
			string
		>;
		if (!name || !img) {
			return fail(400, { message: 'Request invalida' });
		}
		try {
			await prisma.service.update({
				where: {
					id: id
				},
				data: {
					name
				}
			});
		} catch (err) {
			console.error(err);
			return fail(500, { message: 'No se pudo actualizar' });
		}
	}
};
