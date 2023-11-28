import { z } from 'zod';

export const turnSolicitationSchema = z.object({
	desc: z.string().min(3).max(256),
	turn: z.string().datetime()
});
