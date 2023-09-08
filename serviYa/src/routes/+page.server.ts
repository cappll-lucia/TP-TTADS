import { prisma } from "$lib/server/lucia/prisma";
import type { PageServerLoad } from "./login/$types";



export const load: PageServerLoad = async ({ locals }) => {
  try {
    const services = [
      { id: 1, name: "Plomeria" },
      { id: 2, name: "Electricista" }
    ]
      ;
    return { services };
  } catch (error) {
    throw error;
  }
};