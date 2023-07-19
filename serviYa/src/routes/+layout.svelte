<script lang="ts">
     import { isAuthenticated, user } from "../store";
     import {login , logout} from "../lib/authConfig/auth_handlers";
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
              <a href="/#" on:click={logout}>Log Out</a>
            </li>
          {:else}
            <li>
              <a href="/#" on:click={login}>Log In</a>
            </li>
          {/if}
        </ul>
      </span>
    </div>
  </nav>

<main class="container">
   
    <slot />
</main>