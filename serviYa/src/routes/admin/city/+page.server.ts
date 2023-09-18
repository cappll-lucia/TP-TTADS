import type { Actions } from '@sveltejs/kit';
import { citySchema } from './citySchema';
import type { PageServerLoad } from '../$types';

const aux = [] as any[];
export const load: PageServerLoad = async ({ locals }) => {
	// const { user, session } = await locals.auth.validateUser();
	/* if (session && user.role !== 'ADMIN') {
		throw redirect(302, '/');
	} */
	return { cities: aux };
};

export const actions: Actions = {
	add_city: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData()) as Record<string, string>;
		const zodResult = citySchema.safeParse(formData);
		console.log('recived');
		if (!zodResult.success) {
			return {
				data: { ...formData },
				errors: zodResult.error.flatten().fieldErrors
			};
		}
		const city = zodResult.data;

		console.log('adding city', city);
		aux.push(city);
	}
} satisfies Actions;
