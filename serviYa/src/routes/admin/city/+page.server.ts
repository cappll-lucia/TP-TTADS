import { error, type Actions } from '@sveltejs/kit';
import { cityCreateSchema, cityModifySchema } from './citySchema';
import type { PageServerLoad } from '../$types';
import { prisma } from '$lib/server/lucia/prisma';

const aux = [] as any[];
export const load: PageServerLoad = async ({ locals }) => {
	// const { user, session } = await locals.auth.validateUser();
	/* if (session && user.role !== 'ADMIN') {
		throw redirect(302, '/');
	} */
	const allowedProvinces = await prisma.province.findMany();
	const cities = prisma.city.findMany({}); //TODO: Pagination???
	return { cities, allowedProvinces };
};

export const actions: Actions = {
	add_city: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData()) as Record<string, string>;
		const zodResult = cityCreateSchema.safeParse(formData);
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
		aux.push(city);
	},
	modify_city: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData()) as Record<string, string>;
		const zodResult = cityModifySchema.safeParse(formData);
		if (!zodResult.success) {
			return {
				data: { ...formData },
				errors: zodResult.error.flatten().fieldErrors
			};
		}
		const modified_city = zodResult.data;

		const old_city = await prisma.city.findUnique({
			where: { id: modified_city.id }
		});
		if (!old_city) {
			throw error(404, 'Not found city to modify');
		}
		const mod_province = await prisma.province.findFirst({
			where: { name: modified_city.province }
		});
		if (!mod_province) {
			throw error(404, 'Not found province to modify');
		}

		await prisma.city.update({
			data: { name: modified_city.name, province: mod_province.name },
			where: { id: modified_city.id }
		});
	}
} satisfies Actions;
