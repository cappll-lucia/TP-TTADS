import { prisma } from '$lib/server/lucia/prisma';
import type { PageServerLoad } from './$types';

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

export const actions = {
	agendar: async ({ request }) => {
		const formRes = await request.formData();
		const date = new Date(formRes.get('turn'));
		console.log(date);
		return {
			success: true,
			date: date
		};
	}
};
