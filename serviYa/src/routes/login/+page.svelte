<script lang="ts">
  import type { PageData, ActionData } from "./$types";
</script>

<main class="container">
  <article class="grid">
    <div>
      <hgroup>
        <h1>Login</h1>
      </hgroup>
      <form method="POST">
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
    </div>
    <div id="register-img" />
  </article>
</main>

<style>
  #register-img {
    background-image: url("https://blog.pedidosya.com.ar/static/PedidosYaRider-12febb9a302276a3e53ed5d4bc26bd75.webp");
    background-position: center;
    background-size: cover;
  }
</style>
