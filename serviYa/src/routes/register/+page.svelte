<script lang="ts">
  import {enhance} from '$app/forms'
  import type { PageData, ActionData } from "./$types";
  export let form;
  let loading=false;

</script>

<main class="container">
  <article class="grid">
    <div class="form-panel">
      <hgroup>
        <h1>Registro</h1>
      </hgroup>
      <form method="POST" class="register-form" use:enhance={
        ()=>{
          loading=true
          return ()=>{loading=false}
        }
        }>
        <div class="inputs">
          <input
          type="text"
          name="email"
          placeholder="Email"
          aria-label="Email"
          autocomplete="email"
          value={form?.data?.email ?? ''}
          class="{form?.errors?.email ? 'input-error' : 'input'}"
          />
          {#if form?.errors?.email}
          <span class="error">{form?.errors?.email[0]}</span>
          {/if}
          <input
          type="text"
          name="username"
          placeholder="Username"
          aria-label="Username"
          value={form?.data?.username ?? ''}
          class="{form?.errors?.username ? 'input-error' : 'input'}"
          />
        {#if form?.errors?.username}
          <span class="error">{form?.errors?.username[0]}</span>
          {/if}
          <input
          type="text"
          name="name"
          placeholder="Name"
          aria-label="Name"
          class="{form?.errors?.name ? 'input-error' : 'input'}"
          value={form?.data?.name ?? ''}
          />
          {#if form?.errors?.name}
          <span class="error">{form?.errors?.name[0]}</span>
          {/if}
          <input
          type="password"
          name="password"
          placeholder="Password"
          aria-label="Password"
          autocomplete="current-password"
          class="{form?.errors?.password ? 'input-error' : 'input'}"
          value={form?.data?.password ?? ''}
          />
          {#if form?.errors?.password}
          <span class="error">{form?.errors?.password[0]}</span>
          {/if}
          <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          aria-label="confirm Password"
          value={form?.data?.confirmPassword ?? ''}
          class="{form?.errors?.confirmPassword ? 'input-error' : 'input'} {form?.message ? 'message-error' : ''}"
          />
          {#if form?.errors?.confirmPassword}
          <span class="error">{form?.errors?.confirmPassword[0]}</span>
          {/if}
          {#if form?.message}
          <span class="error">{form?.message}</span>
          {/if}
        </div>
        <button type="submit" class="contrast submit-btn" typeof="submit" aria-busy={loading}>Register</button>
      </form>
    </div>
    <div id="register-img" />
  </article>
</main>

<style lang="scss">
.container{
  display:flex;
  height: 40rem;
  justify-content:center;
  padding: 2rem 0;
  align-items:flex-start;
  z-index:0;
  .grid{
    .form-panel{
      display:flex;
      justify-content: space-between;
      align-items: space-between;
      flex-direction:column;
      height:100%;
      h1{
        font-size:2rem;
      }
    }
  }
}
.mt-1{
  margin-top:1rem;  
}
#register-img {
    background-image: url('../../ai.profClient.png');
    background-position: center;
    background-size:cover;
  }
.register-form{
  --form-element-spacing-vertical: 0.5rem;
      display:flex;
      justify-content: space-between;
      flex-direction:column;
      margin-bottom:0;
      .inputs{
        height:25rem;
        .input{
          display:inline-block;
          --spacing:0;
          margin-bottom:2rem;
        }
        .input:first-child{
          margin-top:1rem;
        }
        .message-error{
          margin-bottom:1rem;
        }
      }
    .submit-btn{
      margin-bottom:0;
    }
}
.error{
  font-size: small;
  color: red;
  position: relative;
  display:inline-block;
  height:2rem;
  margin:0;
}
.input-error{
  --spacing:0;
  border: red solid 2px;
  margin-bottom:0rem;
}

</style>
