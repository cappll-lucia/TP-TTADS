<script lang="ts">
  import NavBar from "$lib/components/navbar/NavBar.svelte";

  import type {PageData } from './$types';
 
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';
  
  const city=writable<Location|null>(null)
  setContext('city', city)
  
  export let data: PageData;
</script>

<div class="container-fluid">
  <NavBar data={data} ></NavBar>
  <slot/>
</div>

<style>

  .container-fluid {
    width: 100%;
    padding-left: 0;
    padding-right: 0;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
</style>
