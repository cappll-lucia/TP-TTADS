import { prisma } from '$lib/server/lucia/prisma';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const { user } = await locals.auth.validateUser();
	if (user?.city_id) {
		const city = await prisma.city.findUnique({
			where: {
				id: user.city_id
			}
		});
		return { user, city };
	}
	return { user };
};
