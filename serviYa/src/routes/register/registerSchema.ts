import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string({ required_error: "Ingrese su nombre" })
      .min(1, { message: "Ingrese su nombre" })
      .max(50, { message: "Ingrese hasta 50 caracteres" })
      .trim(),
    username: z
      .string({ required_error: "Ingrese su nombre de usuario" })
      .min(1, { message: "Ingrese su nombre de usuario" })
      .max(20, {
        message: "El nombre de usuario puede tener hasta 20 caracteres",
      }),
    password: z
      .string({ required_error: "Ingrese su contraseña" })
      .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
      .max(20, { message: "La contraseña puede tener hasta 20 caracteres" })
      .trim(),
    confirmPassword: z
      .string({ required_error: "Confirme su contraseña" })
      .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
      .max(20, { message: "La contraseña puede tener hasta 20 caracteres" })
      .trim(),
    email: z
      .string({ required_error: "Ingrese su email" })
      .min(1, { message: "Ingrese su email" })
      .email({ message: "Ingrese un email válido" }),
  })
  .superRefine(({ password, confirmPassword }, context) => {
    if (password !== confirmPassword) {
      context.addIssue({
        code: "custom",
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
      });
    }
  });
