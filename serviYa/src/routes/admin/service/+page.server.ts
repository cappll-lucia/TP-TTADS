import { auth } from '$lib/server/lucia/lucia';
import { LuciaError } from 'lucia-auth';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { prisma } from '$lib/server/lucia/prisma';

const _services = [
	{
		id: 1,
		name: 'plomeria',
		img: 'https://picsum.photos/300'
	},
	{
		id: 2,
		name: 'electricista',
		img: 'https://picsum.photos/300'
	},
	{
		id: 3,
		name: 'gasista',
		img: 'https://picsum.photos/300'
	}
];

export const load: PageServerLoad = async ({ locals }) => {
	const { user, session } = await locals.auth.validateUser();
	/* if (session && user.role !== 'ADMIN') {
		throw redirect(302, '/');
	} */
	//const services = prisma.service.findMany();
	return { _services };
};

export const actions: Actions = {
	add_service: async ({ request }) => {
		const { name, img } = Object.fromEntries(await request.formData()) as Record<string, string>;
		if (!name || !img) {
			return fail(400, { message: 'Invalid request' });
		}
		try {
			/* const service = await prisma.service.create({
				data: {
					name
				}
			});
			return {
				status: 200,
				service
			}; */
			const service = { id: _services.length + 1, name, img };
			_services.push(service);
			console.log(_services);
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
		if (!session && user.role !== 'ADMIN') {
			return fail(403, { message: 'No tienes permisos para realizar esta accion' });
		}
		const id = url.searchParams.get('id');
		if (!id) {
			return fail(400, { message: 'Invalid request' });
		}
		const serviceIndex = _services.findIndex((s) => s.id === Number(id));
		if (serviceIndex === -1) {
			return fail(404, { message: 'No se encontro el Id' });
		}
		_services.splice(serviceIndex, 1);
		/* try {
			await prisma.service.delete({
				where: {
					id: id
				}
			});
		} catch (error) {
			console.log(error);
			return fail(400, { message: 'Server error' });
		}
 */
		return {
			status: 200,
			services: _services
		};
	}
};
