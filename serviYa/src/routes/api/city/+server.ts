import { prisma } from '$lib/server/lucia/prisma';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const search = url.searchParams.get('name');

	if (!search || search.length < 2) {
		const errorBody = { error: 'name must be at least 2 characters long' };
		return new Response(JSON.stringify(errorBody), {
			status: 400,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

	const result = await prisma.city.findMany({
		where: { name: { contains: search, mode: 'insensitive' } }
	});
	return new Response(JSON.stringify({ result }), {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
