import { auth } from "$lib/server/lucia";
import { LuciaError } from "lucia-auth";
import type { ErrorMessage } from "lucia-auth/auth/error";
import { fail, redirect,error } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";


export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.auth.validate();
  if (session) {
    throw redirect(302, "/");
  }
};

export const actions: Actions = {
  login: async ({ request, locals }) => {
    const { username, password } = Object.fromEntries(
      await request.formData()
    ) as Record<string, string>;
    try {
      const key = await auth.useKey("username", username, password);
      const session = await auth.createSession(key.userId);
      //const sessionCookie = auth.createSessionCookie(session).serialize();
      locals.auth.setSession(session);
    } catch (err) {
      let errorMessage = 'Could not login user';
      if(err instanceof LuciaError) errorMessage=err.message;
      throw error(400, errorMessage);
    }
    throw redirect(302, "/");
  },
};
