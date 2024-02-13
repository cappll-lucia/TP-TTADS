import { prisma } from '$lib/server/lucia/prisma';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { notifyTurnRejection } from '$lib/server/email/emailService';
import { appointment_service } from '$lib/server/logic/appointment-service';

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
			appointment.state === 'TO_DO' &&
			appointment.date >= today &&
			appointment.date < new Date(today.setDate(today.getDate() + 1))
		);
	});

	return { pendingAppointments, confirmedAppointments, todayAppointments };
};

function should_not_reach(x: never) {
	throw new Error('Exaustive switch failed: ' + JSON.stringify(x));
}

export const actions: Actions = {
	confirm: async ({ request, locals }) => {
		const { user } = await locals.auth.validateUser();
		if (!user) {
			return fail(401, { msj: 'Unauthorized' });
		}

		const data = await request.formData();
		const appointment_id = data.get('appointment_id')?.toString();
		if (!appointment_id) {
			return fail(400, { msj: 'appointment id required' });
		}
		const res = await appointment_service.acceptTurn({ appointment_id, user });
		switch (res.type) {
			case 'LOGIC_ERROR':
				return fail(400, { msj: res.msj });
			case 'AUTH_ERROR':
				return fail(403, { msj: res.msj });
			case 'OK':
				return { status: 200 };
			default:
				should_not_reach(res);
		}
	},
	finish: async ({ request, locals }) => {
		const { user } = await locals.auth.validateUser();
		if (!user) {
			return fail(401, { msj: 'Unauthorized' });
		}
		const data = await request.formData();
		const appointment_id = data.get('app_id')?.toString();

		if (!appointment_id) {
			return Error('No se envio el id del turno');
		}

		const appointment = await prisma.appointment.findFirst({ where: { id: appointment_id } });
		if (!appointment) {
			return fail(400, { msj: 'not found' });
		}

		if (appointment.profesional_id != user?.userId) {
			return fail(401, { msj: 'Unauthorized' });
		}
		await prisma.appointment.update({
			where: { id: appointment_id },
			data: { state: 'DONE' }
		});
		return { status: 200, success: true };
	},

	reject: async ({ request, locals }) => {
		const { user } = await locals.auth.validateUser();

		if (!user) {
			return fail(401, { msj: 'Unauthorized' });
		}

		const data = await request.formData();
		const appointment_id = data.get('appointment_id')?.toString();
		if (!appointment_id) {
			return fail(400, { msj: 'No se envio el id del turno' });
		}
		const appointment = await prisma.appointment.findUnique({ where: { id: appointment_id } });
		if (!appointment) {
			return fail(404, { msj: 'Appointment not found' });
		}
		if (appointment.profesional_id != user?.userId) {
			return fail(401, { msj: 'You lack the required credentilas' });
		}

		const { client_id, date } = appointment;
		prisma.authUser.findUnique({ where: { id: client_id } }).then((client) => {
			if (!client) return;
			notifyTurnRejection({ to: client.email, date, profesionalName: user.name });
		});

		await prisma.appointment.update({
			where: { id: appointment_id },
			data: { state: 'REJECTED' }
		});

		return { status: 200, success: true };
	}
};
