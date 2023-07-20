<script lang="ts">
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
      {#if true}
        <span>&nbsp;&nbsp</span>
      {:else}<span>&nbsp;</span>{/if}
    </div>
    <span>
      <ul>
        {#if true}
          <li>
            <a href="/#" on:click>Log Out</a>
          </li>
        {:else}
          <li>
            <a href="/#" on:click>Log In</a>
          </li>
        {/if}
      </ul>
    </span>
  </div>
</nav>

<main class="container">
  <slot />
</main>
