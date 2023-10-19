import { prisma } from '$lib/server/lucia/prisma';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { turnSolicitationSchema } from './turnSolicitationSchema';

function addDays(dateTime: Date, count_days = 0) {
	return new Date(new Date(dateTime).setDate(dateTime.getDate() + count_days));
}

export const load: PageServerLoad = async ({ params }) => {
	const profesional_id = params.id;
	const profesional = await prisma.authUser.findUnique({
		where: { id: profesional_id },
		include: { services: true }
	});
	if (!profesional) {
		throw Error('Profesional not found');
	}

	const busy_appointments = await prisma.appointment.findMany({
		where: { profesional_id: profesional_id, date: { gt: new Date() }, state: 'TO_DO' }
	});
	const busy_days = busy_appointments.map((x) => x.date);

	let available_turns: { date: Date; available: boolean }[] = [];

	for (let i = 1; i <= 7; i++) {
		const date = addDays(new Date(), i);
		const available = !busy_days.some((x) => x.getDay() == date.getDay());
		available_turns.push({ date, available });
	}

	return { profesional, available_turns };
};

export const actions: Actions = {
	agendar: async ({ request, locals }) => {
		const { user } = await locals.auth.validateUser();
		if (!user) {
			return fail(401, { message: 'Unauntenticated' });
		}

		const formData = Object.fromEntries(await request.formData()) as Record<string, string>;
		const zodRes = turnSolicitationSchema.safeParse(formData);
		if (zodRes.success === false) {
			return fail(400, { message: 'Invalid request' });
		}

		await prisma.appointment.create({
			data: {
				client_id: user.userId,
				date: new Date(zodRes.data.turn),
				description: zodRes.data.desc,
				profesional_id: zodRes.data.profesional_id,
				state: 'UNCONFIRMED'
			}
		});

		return {
			success: true,
			date: new Date(zodRes.data.turn)
		};
	}
};
