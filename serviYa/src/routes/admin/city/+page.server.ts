import { error, type Actions } from '@sveltejs/kit';
import { cityCreateSchema } from './citySchema';
import type { PageServerLoad } from '../$types';
import { prisma } from '$lib/server/lucia/prisma';

const aux = [] as any[];
export const load: PageServerLoad = async ({ locals }) => {
	// const { user, session } = await locals.auth.validateUser();
	/* if (session && user.role !== 'ADMIN') {
		throw redirect(302, '/');
	} */
	const allowedProvinces = prisma.province.findMany({});
	const cities = prisma.city.findMany({}); //TODO: Pagination???
	return { cities, allowedProvinces };
};

export const actions: Actions = {
	add_city: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData()) as Record<string, string>;
		const zodResult = cityCreateSchema.safeParse(formData);
		console.log('recived');
		if (!zodResult.success) {
			return {
				data: { ...formData },
				errors: zodResult.error.flatten().fieldErrors
			};
		}
		const city = zodResult.data;

		const count = await prisma.province.count({ where: { name: city.province } });
		if (count < 1) {
			throw error(400, 'Province does not exist');
		}

		await prisma.city.create({ data: city });
		console.log('adding city', city);
		aux.push(city);
	}
} satisfies Actions;
