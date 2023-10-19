import { prisma } from '$lib/server/lucia/prisma';
import type { PageServerLoad, Actions } from '../../$types';
import { fail } from '@sveltejs/kit';

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
	const profesionalId = params.id;
	const profesional = await prisma.authUser.findUnique({
		where: { id: profesionalId },
		include: { services: true }
	});
	if (!profesional) {
		throw Error('Profesional not found');
	}

	const reviews = await prisma.review.findMany({
		where: {
			prof_id: profesionalId
		},
		include: {
			author: true,
			prof_user: true
		}
	});
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

	return { profesional, reviews, turns };
};


export const actions: Actions = {
	addReview: async ({ request }) => {
		const { author_id, prof_id, score, comment } = Object.fromEntries(await request.formData()) as Record<string, string>;
		try {
			const review = await prisma.review.create({
				data: {
					author_id,
					prof_id,
					comment,
					score: parseInt(score)
				}
			});
			return {
				status: 200,
			}
		} catch (err) {
			return fail(400, { message: 'Server error' });
		}
	}
}