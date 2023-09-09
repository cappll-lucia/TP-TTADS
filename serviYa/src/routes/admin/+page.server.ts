import { auth } from '$lib/server/lucia/lucia';
import { LuciaError } from 'lucia-auth';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    const { user, session } = await locals.auth.validateUser();
    if (session && user.role !== "ADMIN") {
        throw redirect(302, '/');
    }
};