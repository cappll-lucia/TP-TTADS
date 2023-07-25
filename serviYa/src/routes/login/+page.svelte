<script lang="ts">
  import type { ActionData,PageData } from "./$types";
   export let data;
  export let form:ActionData;
</script>

<main class="container">
  <article class="grid">
    <div>
      <hgroup>
        <h1>Login</h1>
      </hgroup>
      <form  method="POST" >
        {#if form?.message==="AUTH_INVALID_KEY_ID"}
        <span class="error">Usuario incorrecto</span>
        {/if}
        <input
          value={form?.email ?? ''}
          type="text"
          name="username"
          placeholder="Username"
          aria-label="Username"
          required
        />
        {#if form?.message==="AUTH_INVALID_PASSWORD"}
        <span class="error">Clave incorrecta</span>
        {/if}
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
  .error{
    font-size: small;
    color: red;
  }
  #login-img {
    background-image: url('../../ai.profClient.png');
    background-position: center;
    background-size:contain;
  }
</style>
