import { prisma } from '$lib/server/lucia/prisma';

export async function load({params})  {
    const service = params.wantedService;
    const profs = await getProfessionals("San Nicolas", service)
    return {profs, service};
};

async function getProfessionals(location:string, service:string) {
    const resLoc = await prisma.city.findFirst({
        // todo deberia pasarle por parametro el id de la location para no tener que estar buscandolo aca
        where: {
            name: location
        }
    })
    const resServ = await prisma.service.findFirst({
        where: {
            name: service,
        },
    })
    const resProf = await prisma.professionalData.findMany({
        where: {
            location_id: resLoc?.id,
        }})
        //Todo deberia filtrar por el servicio que se esta buscando
    return resProf.map((prof) => {
        return {
            id: prof.id,
            name: prof.user_id,
            profession: resServ?.name,
            location: resLoc?.name,
            rating: "5.5"
        }
    })
}