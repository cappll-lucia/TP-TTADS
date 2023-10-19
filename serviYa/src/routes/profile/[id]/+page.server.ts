import { prisma } from '$lib/server/lucia/prisma';
import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { reviewSchema } from './reviewSchema';
import { ZodError } from 'zod';

function addDays(dateTime: Date, count_days = 0) {
	return new Date(new Date(dateTime).setDate(dateTime.getDate() + count_days));
}

const dateOptions = {
	weekday: 'long',
	year: 'numeric',
	month: 'long',
	day: 'numeric'
};

export const load: PageServerLoad = async ({ params, locals }) => {
	const user = await locals.auth.validate();
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

	const userWrittenReviews = await prisma.review.findMany({
		where: {
			prof_id: profesionalId,
			author_id: user?.userId
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

	return { profesional, user, reviews, userWrittenReviews, turns };
};


export const actions: Actions = {
	addReview: async ({ request, locals, params }) => {
		const formData = Object.fromEntries(await request.formData()) as Record<string, string>;
		const user = await locals.auth.validate();
		if (!user) return fail(401, { message: 'Usuario no autenticado' });
		const profesionalId = params.id;
		try {
			const { score, comment } = reviewSchema.parse(formData);
			const review = await prisma.review.create({
				data: {
					author_id: user.userId,
					prof_id: profesionalId,
					comment,
					score: Number(score)
				}
			});
			return {
				status: 200,
			}
		} catch (error) {
			if (error instanceof ZodError) {
				const { fieldErrors: errors } = error.flatten();
				return {
					data: { formData },
					errors
				};
			} else {
				return {
					message: 'No se pudo registrar la reseña'
				};
			}
		}
	}
}