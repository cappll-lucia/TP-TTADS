// hooks.server.ts
import { auth } from '$lib/server/lucia/lucia';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.auth = auth.handleRequest(event);
	if (event.url.pathname.includes('admin')) {
		const { user, session } = await event.locals.auth.validateUser();
		if (!session || user.role !== 'ADMIN') {
			throw redirect(302, '/');
		}
	}
	return await resolve(event);
};
