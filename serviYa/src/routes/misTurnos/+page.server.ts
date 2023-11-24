import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/lucia/prisma';

export const load = (async ({ locals }) => {
	const { user } = await locals.auth.validateUser();
	if (!user) {
		throw redirect(302, '/');
	}
	const pendingAppointments = prisma.appointment.findMany({
		where: { client_id: user.userId, state: 'UNCONFIRMED' }
	});
	return {};
}) satisfies PageServerLoad;
