import { z } from 'zod';

export const citySchema = z.object({
	name: z
		.string({ required_error: 'Ingrese el nombre' })
		.min(3, { message: 'Ingrese el nombre' })
		.max(20, { message: 'No puede exceder los 20 caracteres' })
		.trim()
});
