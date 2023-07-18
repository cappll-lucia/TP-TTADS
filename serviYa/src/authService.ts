import { Auth0Client, createAuth0Client } from "@auth0/auth0-spa-js";
import { user, isAuthenticated, popupOpen } from "./store.js";

import config from "./auth_config.js";

async function createClient() {
  let auth0Client: Auth0Client = await createAuth0Client({
    domain: config.domain,
    clientId: config.clientId,
  });
  return auth0Client;
}

async function loginWithPopup(client: any, options: any) {
  popupOpen.set(true);
  try {
    await client.loginWithPopup(options);

    user.set(await client.getUser());
    isAuthenticated.set(true);
  } catch (e) {
    // eslint-disable-next-line
    console.error(e);
  } finally {
    popupOpen.set(false);
  }
}

function logout(client: Auth0Client) {
  return client.logout();
}

const auth = {
  createClient,
  loginWithPopup,
  logout,
};

export default auth;
