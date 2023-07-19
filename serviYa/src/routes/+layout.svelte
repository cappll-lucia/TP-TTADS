<script lang="ts">
  import { isAuthenticated, user } from "../store";
  import { login, logout } from "../lib/authConfig/auth_handlers";
  import auth from "../authService";
  import type { Auth0Client } from "@auth0/auth0-spa-js";
  import { onMount } from "svelte";
  import { auth0Client } from "../lib/authConfig/auth_handlers";
  let authclient: Auth0Client;
  auth0Client.subscribe((client) => (authclient = client));
  onMount(async () => {
    auth0Client.set(await auth.createClient());
    auth0Client.subscribe(async (client) => {
      isAuthenticated.set(await client.isAuthenticated());
      user.set(await client.getUser());
    });
  });
</script>

<nav>
  <a href="/#">Task Manager</a>
  <button
    type="button"
    data-toggle="collapse"
    data-target="#navbarText"
    aria-controls="navbarText"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <span />
  </button>
  <div id="navbarText">
    <div>
      {#if $isAuthenticated}
        <span>&nbsp;&nbsp;{$user?.name} ({$user?.email})</span>
      {:else}<span>&nbsp;</span>{/if}
    </div>
    <span>
      <ul>
        {#if $isAuthenticated}
          <li>
            <a href="/#" on:click={logout(authclient)}>Log Out</a>
          </li>
        {:else}
          <li>
            <a href="/#" on:click={login(authclient)}>Log In</a>
          </li>
        {/if}
      </ul>
    </span>
  </div>
</nav>

<main class="container">
  <slot />
</main>
