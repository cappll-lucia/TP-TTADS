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

<style lang="scss">
.container{
  display:flex;
  height:calc(100vh - 80px);
  justify-content:center;
  align-items:center;
}
#register-img {
    background-image: url('../../ai.profClient.png');
    background-position: center;
    background-size:contain;
  }
</style>
