<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
</script>

<div class="container-fluid">
  <nav class="bg-white px-4">
    <ul>
      <li>
        <a href="/"
          ><img
            alt="logo"
            height="30px"
            width="30px"
            src="/serviYa2.png"
          />ServiYa</a
        >
      </li>
    </ul>
    <ul>
      {#if data.user}
        <li>Bienvenido {data.user?.username}</li>
      {/if}
      <details role="list">
        <summary aria-haspopup="listbox">
          <i class="fa-regular fa-user" />
        </summary>
        <ul role="listbox">
          {#if !data.user}
            <li>
              <a href="/register">Register</a>
            </li>
            <li>
              <a href="/login">Log in</a>
            </li>
          {:else}
            <form class="mb-0" method="POST">
              <button class="a" formaction="/logout" type="submit"
                ><li class="shadow">LogOut</li></button
              >
            </form>
            <li>WIP</li>
          {/if}
        </ul>
      </details>
    </ul>
  </nav>

  <slot />
</div>

<style>
  .mb-0 {
    margin-bottom: 0;
  }
  .bg-white {
    background-color: white;
  }
  .px-4 {
    padding-left: 3rem;
    padding-right: 3rem;
  }
  details {
    margin-bottom: 0;
  }
  .container-fluid {
    padding-left: 0;
    padding-right: 0;
  }
  i {
    color: rgb(35, 35, 140);
  }

  .a {
    /* Restaurar los estilos por defecto del botón */
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    font: inherit;
    cursor: pointer;
    color: var(--dropdown-color); /* Color del texto como un enlace */
    text-decoration: underline; /* Subrayado como un enlace */
    width: 100%;
    text-decoration: none;
  }
  .a:hover,
  .a:focus {
    cursor: pointer;
    outline: none;
  }
  .shadow:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
</style>
