import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from '../$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const { user, session } = await locals.auth.validateUser();
	if (session && user.role !== 'ADMIN') {
		throw redirect(302, '/');
	}
};
