import { prisma } from '$lib/server/lucia/prisma';
import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { ZodError } from 'zod';
import { reviewSchema } from './reviewSchema';

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
		const zodResult = reviewSchema.safeParse(formData);
		if (!zodResult.success) {
			return {
				data: {
					...formData
				},
				errors: zodResult.error.flatten().fieldErrors
			};
		}
		const user = await locals.auth.validate();
		if (!user) return fail(401, { message: 'Usuario no autenticado' });
		const profesionalId = params.id;
		const review = await prisma.review.create({
			data: {
				author_id: user.userId,
				prof_id: profesionalId,
				comment: formData.comment,
				score: Number(formData.score)
			}
		})
		return {
			status: 200,
		}
	},
	editReview: async ({ request, locals, params }) => {
		const formData = Object.fromEntries(await request.formData()) as Record<string, string>;
		const reviewId = formData.id;
		delete formData.id
		const zodResult = reviewSchema.safeParse(formData);
		if (!zodResult.success) {
			return {
				data: { ...formData },
				errors: zodResult.error.flatten().fieldErrors
			};
		}
		const user = await locals.auth.validate();
		if (!user) return fail(401, { message: 'Usuario no autenticado' });
		const profesionalId = params.id;
		await prisma.review.update({
			data: {
				comment: formData.comment,
				score: Number(formData.score),
				edited_at: new Date()
			},
			where: {
				id: reviewId,
			}
		})
		return {
			status: 200,
		}
	},
	deleteReview: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData()) as Record<string, string>;
		await prisma.review.delete({
			where: {
				id: formData.id,
			}
		})
	}
}