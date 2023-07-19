<script lang="ts">
  import { onMount } from "svelte";
  import auth from "../authService";
  import { isAuthenticated, user, user_tasks, tasks } from "../store";
  import TaskItem from "../lib/components/TaskItem.svelte";
  import type { Auth0Client } from "@auth0/auth0-spa-js";
  import {login , logout} from "../lib/authConfig/auth_handlers"

  let auth0Client: Auth0Client;
  let newTask: any;

  onMount(async () => {
    auth0Client = await auth.createClient();

    isAuthenticated.set(await auth0Client.isAuthenticated());
    user.set(await auth0Client.getUser());
  });

  
  function addItem() {
    let newTaskObject = {
      id: genRandom(),
      description: newTask,
      completed: false,
      user: $user?.email,
    };

    console.log(newTaskObject);

    let updatedTasks = [...$tasks, newTaskObject];

    tasks.set(updatedTasks);

    newTask = "";
  }

  function genRandom(length = 7) {
    var chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var result = "";
    for (var i = length; i > 0; --i)
      result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
  }
</script>

  <!-- App Bar -->
  
  <!-- Application -->
  {#if !$isAuthenticated}
    <div>
      <div>
        <div>
          <div>
            <h1>Task Management made Easy!</h1>
            <p>Instructions</p>
            <ul>
              <li>Login to start &#128272;</li>
              <li>Create Tasks &#128221;</li>
              <li>Tick off completed tasks &#9989;</li>
            </ul>
            <a href="/#" role="button" on:click={login}>Log In</a>
          </div>
        </div>
      </div>
    </div>
  {:else}
    <div id="main-application">
      <div>
        <div>
          <ul>
            {#each $user_tasks as item (item.id)}
              <TaskItem task={item} />
            {/each}
          </ul>
        </div>
        <div>
          <input bind:value={newTask} placeholder="Enter New Task" />
          <br />
          <button type="button" on:click={addItem}> Add Task </button>
        </div>
      </div>
    </div>
  {/if}

<style>
  #main-application {
    margin-top: 50px;
  }
</style>
