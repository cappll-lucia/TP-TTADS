<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
</script>

<div class="container">
  <nav>
    <div id="navbarText">
      <div>
        {#if data.user}
          <span>{data.user.email} &nbsp;&nbsp{data.user.name}</span>
        {:else}<span>&nbsp;</span>{/if}
      </div>

      <ul>
        <form method="POST">
          <li><a href="/">Home</a></li>
          {#if !data.user}
            <li>
              <a href="/register" on:click>Register</a>
            </li>
            <li>
              <a href="/login" on:click>Log in</a>
            </li>
          {:else}
            <li>
              <button formaction="/logout" type="submit">LogOut</button>
            </li>
            <li />
          {/if}
        </form>
      </ul>
    </div>
  </nav>

  <slot />
</div>
