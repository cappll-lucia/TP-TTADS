import type { SafeParseError, ZodObject, ZodRawShape } from 'zod';
import type { ActionData } from '../routes/$types';
import type { Writable } from 'svelte/store';

export function capitalize(x: string) {
	return x.charAt(0).toUpperCase() + x.slice(1).toLowerCase();
}

export function parseFormData<T extends ZodRawShape>(formdata: FormData, schema: ZodObject<T>) {
	const obj = {} as any;
	formdata.forEach((v: any, k: any) => (obj[k] = v));
	return schema.safeParse(obj);
}

export function mapErrorToForm<T>(form: Writable<ActionData>, err: SafeParseError<T>) {
	const { fieldErrors } = err.error.flatten();
	form.set({ errors: fieldErrors } as ActionData);
}
