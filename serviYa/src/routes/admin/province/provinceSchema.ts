import { z } from 'zod';

export const provinceCreateSchema = z.object({
	name: z.string().min(3).max(32).trim()
});

export const provinceEditSchema = z.object({
	id: z.string().length(24).trim(), //TODO: check mongodb id format
	name: z.string().min(3).max(32).trim()
});
