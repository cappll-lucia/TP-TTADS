import { prisma } from '$lib/server/lucia/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	try {
		const services = await prisma.service.findMany();
		return { services };
	} catch (error) {
		throw error;
	}
};
