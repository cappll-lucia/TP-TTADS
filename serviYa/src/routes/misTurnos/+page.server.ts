import { prisma } from '$lib/server/lucia/prisma';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { user } = await locals.auth.validateUser();
	if (!user) {
		throw redirect(302, '/');
	}
	//TODO: habria que ver si se tiene que meter a que servicio se quiere pedir turno
	const appointments = await prisma.appointment.findMany({
		where: { client_id: user.userId },
		include: { profesional: true }
	});
	const my_appointments = appointments.sort((appointment1, appointment2) =>
		appointment1.date.getDate() > appointment2.date.getDate() ? -1 : 1
	);

	const pendingAppointments = my_appointments.filter(
		(appointment) => appointment.state === 'UNCONFIRMED' && appointment.date >= new Date()
	);

	const confirmedAppointments = my_appointments.filter(
		(appointment) =>
			appointment.state === 'TO_DO' && appointment.date >= new Date(new Date().setHours(0, 0, 0))
	);

	const rejectedAppointments = my_appointments.filter(
		(appointment) =>
			appointment.state === 'REJECTED' && appointment.date >= new Date(new Date().setHours(0, 0, 0))
	);

	const otherAppointments = my_appointments.filter((appointment) => appointment.date <= new Date());
	return { pendingAppointments, confirmedAppointments, otherAppointments, rejectedAppointments };
};

export const actions: Actions = {
	cancel: async ({ request }) => {
		const data = await request.formData();
		const appointment_id = data.get('appointment_id')?.toString();

		if (!appointment_id) {
			return Error('No se envio el id del turno');
		}
		await prisma.appointment.delete({
			where: { id: appointment_id }
		});

		return { status: 200, success: true };
	}
};
