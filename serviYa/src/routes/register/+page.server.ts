import { auth } from "$lib/server/lucia/lucia";
import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import { ZodError } from "zod";
import { registerSchema } from "./registerSchema";

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.auth.validate();
  if (session) {
    throw redirect(302, "/");
  }
};

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = Object.fromEntries(await request.formData()) as Record<
      string,
      string
    >;
    const { name, username, password, email } = formData;
    try {
      const result = registerSchema.parse(formData);
      await auth.createUser({
        primaryKey: {
          providerId: "username",
          providerUserId: username,
          password,
        },
        attributes: {
          name,
          email,
          username,
        },
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const { fieldErrors: errors } = error.flatten();
        // const { confirmPassword, ...others} =  formData;
        return {
          data: { ...formData },
          errors,
        };
      } else {
        console.log(error);
        return {
          message: "No se pudo registrar al usuario",
        };
      }
      return fail(400, { message: "Could not register user" });
    }
    throw redirect(302, "/login");
  },
};
