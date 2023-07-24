<script lang="ts">
  import type {PageData } from './$types';
  export let data: PageData;
  import NavBar from "$lib/components/navbar/NavBar.svelte";
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
