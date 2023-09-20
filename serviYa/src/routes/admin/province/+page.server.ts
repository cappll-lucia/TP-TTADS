import { error, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import { prisma } from '$lib/server/lucia/prisma';
import { provinceCreateSchema, provinceEditSchema } from './provinceSchema';

export const load: PageServerLoad = async ({ locals }) => {
	// const { user, session } = await locals.auth.validateUser();
	/* if (session && user.role !== 'ADMIN') {
		throw redirect(302, '/');
	} */
	const provinces = await prisma.province.findMany({});
	console.log({ provinces });
	return { provinces };
};

export const actions: Actions = {
	add_province: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData()) as Record<string, string>;
		const zodResult = provinceCreateSchema.safeParse(formData);
		if (!zodResult.success) {
			return {
				data: { ...formData },
				errors: zodResult.error.flatten().fieldErrors
			};
		}
		const province = zodResult.data;

		await prisma.province.create({ data: province });
	},

	edit_province: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData()) as Record<string, string>;
		const zodResult = provinceEditSchema.safeParse(formData);
		if (!zodResult.success) {
			console.log(formData);
			return {
				data: { ...formData },
				errors: zodResult.error.flatten().fieldErrors
			};
		}
		const province = zodResult.data;

		const old_province = await prisma.province.findUnique({ where: { id: province.id } });
		if (!old_province) {
			throw error(404, 'Not found province');
		}

		await prisma.province.update({
			data: { name: province.name },
			where: { id: province.id }
		});

		await prisma.city.updateMany({
			data: { province: province.name },
			where: { province: old_province.name }
		});
	}
} satisfies Actions;
