import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from '../$types';
import { prisma } from '$lib/server/lucia/prisma';
export const load: PageServerLoad = async ({ locals }) => {
	const { user, session } = await locals.auth.validateUser();
	if (!session) {
		throw redirect(302, '/login');
	}
	if (user.role === 'PROFESIONAL') {
		throw redirect(302, '/');
	}
	try {
		const services = await prisma.service.findMany({});
		return { services };
	} catch (err) {
		console.log(err);
	}
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const { user } = await locals.auth.validateUser();
		if (!user) {
			return error(401, 'Unauthorized');
		}
		const { city_id, phone, description, service_id } = Object.fromEntries(
			await request.formData()
		) as Record<string, string>;
		try {
			await prisma.authUser.update({
				where: {
					id: user.userId
				},
				data: {
					role: 'PROFESIONAL',
					city_id,
					description,
					phone,
					services_id: [service_id]
				}
			});

			return {
				status: 200,
				body: {
					message: 'Profesional created'
				}
			};
		} catch (err) {
			console.log(err);
		}
	}
};
