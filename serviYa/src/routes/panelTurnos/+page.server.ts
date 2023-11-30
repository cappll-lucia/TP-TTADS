import { prisma } from '$lib/server/lucia/prisma';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { user } = await locals.auth.validateUser();
	if (!user || user.role !== 'PROFESIONAL') {
		throw redirect(302, '/');
	}
	const appointments = await prisma.appointment.findMany({
		where: { profesional_id: user.userId }
	});

	const pendingAppointments = appointments.filter(
		(appointment) => appointment.state === 'UNCONFIRMED' && appointment.date >= new Date()
	);

	const confirmedAppointments = appointments.filter(
		(appointment) =>
			appointment.state === 'TO_DO' && appointment.date >= new Date(new Date().setHours(0, 0, 0))
	);
	const todayAppointments = appointments.filter((appointment) => {
		const today = new Date(new Date().setHours(0, 0, 0));
		return (
			appointment.date >= today && appointment.date < new Date(today.setDate(today.getDate() + 1))
		);
	});

	return { pendingAppointments, confirmedAppointments, todayAppointments };
};

export const actions: Actions = {
	confirm: async ({ request }) => {
		const data = await request.formData();
		const appointment_id = data.get('appointment_id')?.toString();
		//todo falta validar cosas (segun bruno)
		await prisma.appointment.update({
			where: { id: appointment_id },
			data: { state: 'TO_DO' }
		});
		return { status: 200 };
	},
	reject: async ({ request }) => {
		const data = await request.formData();
		const appointment_id = data.get('appointment_id')?.toString();
		//todo falta validar cosas (segun bruno)
		if (!appointment_id) {
			return Error('No se envio el id del turno');
		}
		await prisma.appointment.update({
			where: { id: appointment_id },
			data: { state: 'REJECTED' }
		});

		return { status: 200, success: true };
	},
	finish: async ({ request }) => {
		const data = await request.formData();

		const appointment_id = data.get('app_id') as string;
		console.log(appointment_id);
		// if (!appointment_id) {
		// 	return Error('No se envio el id del turno');
		// }
		// await prisma.appointment.update({
		// 	where: { id: appointment_id },
		// 	data: { state: 'DONE' }
		// });

		// return { status: 200, success: true };
	}
};
