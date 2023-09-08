// lib/server/lucia.ts
import lucia from 'lucia-auth';
import { sveltekit } from 'lucia-auth/middleware';
import prismaAdapter from '@lucia-auth/adapter-prisma';
import { dev } from '$app/environment';
import { prisma } from '$lib/server/lucia/prisma';

export const auth = lucia({
	adapter: prismaAdapter(prisma),
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	transformDatabaseUser: (userData) => ({
		userId: userData.id,
		name: userData.name,
		email: userData.email,
	})
});

export type Auth = typeof auth;
