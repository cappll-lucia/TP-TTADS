import auth from "../../authService";
import type { Auth0Client } from "@auth0/auth0-spa-js";

let auth0Client: Auth0Client;

export function login() {
  auth.loginWithPopup(auth0Client, {});
}

export function logout() {
  auth.logout(auth0Client);
}
