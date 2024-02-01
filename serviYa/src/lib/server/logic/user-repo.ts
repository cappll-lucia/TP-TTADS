import { prisma } from '../lucia/prisma';

type AuthUser = {
	id: string;
	name: string;
	email: string;
	role: string;
	city_id: string | null;
	url_photo: string | null;
	services_id: string[];
	phone: string | null;
	description: string | null;
};

export interface IUserRepo {
	getbyId(id: string): Promise<AuthUser | null>;
}

export class UserRepo implements IUserRepo {
	async getbyId(client_id: string) {
		return await prisma.authUser.findUnique({ where: { id: client_id } });
	}
}

export const user_repo = new UserRepo();
