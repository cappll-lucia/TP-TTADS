import { prisma } from '$lib/server/lucia/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const profesional_id = params.id;
	const res = await prisma.professionalData.findUnique({
		where: { id: profesional_id }
	});

	return { res };
};
