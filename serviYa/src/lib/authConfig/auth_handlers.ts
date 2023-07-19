import { writable, type Writable } from "svelte/store";
import auth from "../../authService";
import type { Auth0Client } from "@auth0/auth0-spa-js";

export const auth0Client: Writable<Auth0Client> = writable();

export function login(auth0Client: Auth0Client) {
  return () => auth.loginWithPopup(auth0Client, {});
}

export function logout(auth0Client: Auth0Client) {
  return () => auth.logout(auth0Client);
}
