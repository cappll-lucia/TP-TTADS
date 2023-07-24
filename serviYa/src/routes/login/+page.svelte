<script lang="ts">
  import { page } from '$app/stores';
  import { errorStore } from "../../store";
  import type { LuciaError } from 'lucia-auth';

  const data = $errorStore;
  
</script>

<main class="container">
  <article class="grid">
    <div>
      <hgroup>
        <h1>Login</h1>
      </hgroup>
      <form  method="POST" >
        <input
          type="text"
          name="username"
          placeholder="Username"
          aria-label="Username"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          aria-label="Password"
          autocomplete="current-password"
          required
        />
        <button type="submit" class="contrast" typeof="submit">Log in</button>
      </form>

      <p>No tienes una cuenta <a href="/register">Register</a></p>
      {#if data}
        <p>{data}</p>
      {/if}
    </div>
    <div id="login-img" />
  </article>
</main>

<style  lang="scss">
  .container{
    height:calc(100vh - 80px);
    .grid{
      margin-top:60px;
    }
  }
  #login-img {
    background-image: url('../../ai.profClient.png');
    background-position: center;
    background-size:contain;
  }
</style>
