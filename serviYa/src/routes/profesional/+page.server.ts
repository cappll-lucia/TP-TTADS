import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) {
		throw redirect(302, '/login');
	}
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData()) as Record<string, any>;
		try {
			console.log(JSON.stringify(data.province));
		} catch (err) {
			console.log(err);
		}
	}
};
