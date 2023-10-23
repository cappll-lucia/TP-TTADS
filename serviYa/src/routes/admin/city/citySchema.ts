import { z } from 'zod';

export const cityCreateSchema = z.object({
	name: z
		.string({ required_error: 'please indicate a name' })
		.min(3, { message: 'can not have les than 3 characters' })
		.max(20, { message: 'can not exceed 20 charaters' })
		.trim(),
	province: z
		.string({ required_error: 'select a province' })
		.min(3, { message: 'select a province' })
		.max(20, { message: 'can not exceed 20 charaters' })
		.trim()
});

export const cityModifySchema = z.object({
	id: z.string({ required_error: 'please indicate an id' }).min(1).max(50),
	name: z
		.string({ required_error: 'please indicate a name' })
		.min(3, { message: 'can not have les than 3 characters' })
		.max(20, { message: 'can not exceed 20 charaters' })
		.trim(),
	province: z
		.string({ required_error: 'select a province' })
		.min(3, { message: 'select a province' })
		.max(20, { message: 'can not exceed 20 charaters' })
		.trim()
});
