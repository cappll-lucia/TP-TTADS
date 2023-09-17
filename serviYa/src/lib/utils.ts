import type { Writable } from 'svelte/store';
import { ZodError } from 'zod';

export function capitalize(x: string) {
	return x.charAt(0).toUpperCase() + x.slice(1).toLowerCase();
}

//This may be a good idea, or a terrible one :)
export const default_enhance =
	(c: { zodSchema: { parse(x: unknown): any }; loading: boolean; formStore: Writable<any> }) =>
	({ formData }: any) => {
		try {
			const obj = {} as any;
			formData.forEach((v: any, k: any) => (obj[k] = v));
			c.zodSchema.parse(obj);
			c.formStore.update((x) => (x.errors = {})); // dont show errors
			c.loading = true;
			return ({ update }: any) => {
				c.loading = false;
				update();
			};
		} catch (error) {
			if (error instanceof ZodError) {
				const { fieldErrors } = error.flatten();
				c.formStore.set({ errors: fieldErrors });
			}
		}
	};
