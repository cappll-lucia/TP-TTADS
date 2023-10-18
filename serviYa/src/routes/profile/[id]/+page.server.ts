import { prisma } from '$lib/server/lucia/prisma';
import type { PageServerLoad } from './$types';

function addDays(dateTime: Date, count_days = 0) {
	return new Date(new Date(dateTime).setDate(dateTime.getDate() + count_days));
}

const dateOptions = {
	weekday: 'long',
	year: 'numeric',
	month: 'long',
	day: 'numeric'
};

export const load: PageServerLoad = async ({ params }) => {
	const profesional_id = params.id;
	const profesional = await prisma.authUser.findUnique({
		where: { id: profesional_id },
		include: { services: true }
	});
	if (!profesional) {
		throw Error('Profesional not found');
	}
	const turns = [];

	for (let i = 0; i < 30; i++) {
		turns.push({
			date: addDays(new Date(), i).toLocaleDateString('es-AR', {
				weekday: 'long',
				day: 'numeric',
				month: 'long'
			}),
			available: true
		});
	}

	return { profesional, turns };
};
