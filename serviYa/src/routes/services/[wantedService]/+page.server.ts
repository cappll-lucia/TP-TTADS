import { prisma } from '$lib/server/lucia/prisma';

export async function load({ params }) {
	const service = params.wantedService;
	const professionalsList = await getProfessionals('San Nicolas', service);
	return { professionalsList, service };
}

async function getProfessionals(location: string, service: string) {
	const resLoc = await prisma.city.findFirst({
		// todo deberia pasarle por parametro el id de la location para no tener que estar buscandolo aca
		where: {
			name: location
		}
	});
	const resServ = await prisma.service.findFirst({
		where: {
			name: service
		}
	});
	if (resLoc && resServ) {
		const resProf = await prisma.professionalData.findMany({
			where: {
				location_id: resLoc.id,
				services_id: {
					hasSome: resServ.id
				}
			}
		});
		return resProf.map((prof) => {
			return {
				id: prof.id,
				name: prof.user_id,
				profession: resServ.name,
				location: resLoc.name,
				rating: '5.5'
			};
		});
	}
	return [];
}
