import { z } from 'zod';

export const editmeSchema = z.object({
	name: z
		.string({ required_error: 'Ingrese su nombre' })
		.min(1, { message: 'Ingrese su nombre' })
		.max(50, { message: 'Ingrese hasta 50 caracteres' })
		.trim(),
	city_id: z
		.string({ required_error: 'Ingrese su ciudad' })
		.min(2, { message: 'Ingrese su ciudad' })
		.trim()
});
