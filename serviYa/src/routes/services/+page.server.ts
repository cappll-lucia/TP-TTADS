import { prisma } from '$lib/server/lucia/prisma';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    const allServices = await prisma.service.findMany({});
    return {allServices};
}) satisfies PageServerLoad;