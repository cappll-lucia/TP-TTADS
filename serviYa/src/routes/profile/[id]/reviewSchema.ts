import { z } from 'zod';

export const reviewSchema = z.object({
    score: z
        .string({ required_error: 'Seleccione una puntuación de 1 a 5 estrellas' })
        .min(1, { message: 'Seleccione una puntuación de 1 a 5 estrellas' })
        .max(5, { message: 'Seleccione una puntuación de 1 a 5 estrellas' }),
    comment: z
        .string({ required_error: 'Agregue algún comentario' })
        .min(4, { message: 'Su mensaje es muy breve' })
        .max(100, { message: 'Alcanzó el límite de 100 caracteres' })
})