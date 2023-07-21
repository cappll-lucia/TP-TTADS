<script lang="ts">
  import type { PageData, ActionData } from "./$types";

  // export let form
</script>

<main class="container">
  <article class="grid">
    <div>
      <hgroup>
        <h1>Sign up</h1>
      </hgroup>
      <form method="POST">
        <input
          type="text"
          name="email"
          placeholder="Email"
          aria-label="Email"
          autocomplete="email"
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          aria-label="Username"
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          aria-label="Name"
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
        <button type="submit" class="contrast" typeof="submit">Register</button>
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
