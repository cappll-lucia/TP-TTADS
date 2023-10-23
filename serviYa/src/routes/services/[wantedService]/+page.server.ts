import { prisma } from '$lib/server/lucia/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, url }) => {
	const service = params.wantedService;
	const cityId = url.searchParams.get('city');
	if (!cityId) {
		throw new Error('City not found');
	}
	const professionalsList = await getProfessionals(cityId, service);
	return { professionalsList, service };
};


async function getProfessionals(cityId: string, service: string) {
	const resServ = await prisma.service.findFirst({
		where: {
			name: service
		}
	});
	if (!resServ) {
		throw Error('Service not found');
	}
	const resProf = await prisma.authUser.findMany({
		where: {
			city_id: cityId,
			services_id: {
				hasSome: resServ.id
			}
		}
	});
	return resProf.map((prof) => {
		return {
			id: prof.id,
			name: prof.name,
			profession: resServ.name,
			rating: '5.5'
		};
	});
}
