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

	//TODO - todo esto deberia sacarse desde los datos del profesional
	const professional_valid_days = [true, true, true, true, true, false, false];

	let available_turns: { date: Date; available: boolean }[] = [];

	for (let i = 1; i <= 7; i++) {
		const day = addDays(new Date(), i);
		const valid_day = professional_valid_days[day.getDay() - 1];
		available_turns.push({
			date: day,
			available: valid_day
		});
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
				profesional_id: zodRes.data.profesional_id
			}
		});

		return {
			success: true,
			date: new Date(zodRes.data.turn)
		};
	}
};