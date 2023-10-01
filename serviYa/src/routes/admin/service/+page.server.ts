import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { prisma } from '$lib/server/lucia/prisma';

export const load: PageServerLoad = async ({ locals }) => {
	const { user, session } = await locals.auth.validateUser();
	/* if (session && user.role !== 'ADMIN') {
		throw redirect(302, '/');
	} */
	const services = prisma.service.findMany();
	return { services };
};

export const actions: Actions = {
	add_service: async ({ request }) => {
		const { name, img } = Object.fromEntries(await request.formData()) as Record<string, string>;
		if (!name) {
			return fail(400, { message: 'Invalid request' });
		}
		try {
			const service = await prisma.service.create({
				data: {
					name
				}
			});
			return {
				status: 200,
				service
			};
		} catch (error) {
			return fail(400, { message: 'Server error' });
		}
	},
	delete_service: async ({ url, locals }) => {
		const { user, session } = await locals.auth.validateUser();
		if (!session) {
			throw redirect(302, '/login');
		}
		/* if (user?.role !== 'ADMIN') {
			return fail(403, { message: 'No tienes permisos para realizar esta accion' });
		} */
		const id = url.searchParams.get('id');
		if (!id) {
			return fail(400, { message: 'Invalid request' });
		}
		try {
			await prisma.service.delete({
				where: {
					id: id
				}
			});
		} catch (error) {
			return fail(400, { message: 'Server error' });
		}
		return {
			status: 200,
			message: 'Servicio eliminado'
		};
	}
};
