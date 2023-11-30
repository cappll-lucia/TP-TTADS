import { prisma } from '$lib/server/lucia/prisma';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions, RequestEvent, RequestEvent } from './$types';
import { notifyTurnAceptation, notifyTurnRejection } from '$lib/server/email/emailService';
import { EventEmitterAsyncResource } from 'nodemailer/lib/xoauth2';
import type { RouteParams } from '../$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { user } = await locals.auth.validateUser();
	if (!user || user.role !== 'PROFESIONAL') {
		throw redirect(302, '/');
	}
	const appointments = await prisma.appointment.findMany({
		where: { profesional_id: user.userId }
	});

	const pendingAppointments = appointments
		.filter((appointment) => appointment.state === 'UNCONFIRMED' && appointment.date >= new Date());

	const confirmedAppointments = appointments
		.filter((appointment) => appointment.state === 'TO_DO' && appointment.date >= new Date());

	const otherAppointments = appointments
		.filter((appointment) => appointment.state === 'DONE' || appointment.state === 'REJECTED');

	return { pendingAppointments, confirmedAppointments, otherAppointments };
};

export const actions: Actions = {
	confirm: async ({ request, locals }) => {
		const { user } = await locals.auth.validateUser()

		const data = await request.formData();
		const appointment_id = data.get('appointment_id')?.toString();
		if (!appointment_id) {
			return fail(400, { msj: 'No se envio el id del turno' });
		}
		const appointment = await prisma.appointment.findUnique({ where: { id: appointment_id } })
		if (!appointment) {
			return fail(404, { msj: 'Appointment not found' })
		}
		if (appointment.profesional_id != user?.userId) {
			return fail(401, { msj: 'You lack the required credentilas' })
		}

		await prisma.appointment.update({
			where: { id: appointment_id },
			data: { state: 'TO_DO' }
		});

		const { client_id, date } = appointment

		prisma.authUser.findUnique({ where: { id: client_id } })
			.then(client => {
				if (!client) return
				notifyTurnAceptation({ to: client.email, date, profesionalName: user.name })
			})
		return { status: 200 };
	},

	reject: async ({ request, locals }) => {
		const { user } = await locals.auth.validateUser()

		const data = await request.formData();
		const appointment_id = data.get('appointment_id')?.toString();
		if (!appointment_id) {
			return fail(400, { msj: 'No se envio el id del turno' });
		}
		const appointment = await prisma.appointment.findUnique({ where: { id: appointment_id } })
		if (!appointment) {
			return fail(404, { msj: 'Appointment not found' })
		}
		if (appointment.profesional_id != user?.userId) {
			return fail(401, { msj: 'You lack the required credentilas' })
		}

		await prisma.appointment.delete({
			where: { id: appointment_id }
		});

		const { client_id, date } = appointment
		prisma.authUser.findUnique({ where: { id: client_id } })
			.then(client => {
				if (!client) return
				notifyTurnRejection({ to: client.email, date, profesionalName: user.name })
			})

		return { status: 200, success: true };
	}
};
