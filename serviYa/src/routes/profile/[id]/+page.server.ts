import { prisma } from '$lib/server/lucia/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const profesional_id = params.id;

	return { res };
};
