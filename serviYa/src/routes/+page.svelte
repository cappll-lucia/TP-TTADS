<script lang="ts">
  import Img from "$lib/components/Img.svelte";
  import type { PageData } from "./$types";
  export let data: PageData;
  const id = [237, 238, 239, 240, 241, 242];
</script>

{#if data.user}
  <div class="grid my-3">
    {#each id as i}
      <div>
        <Img src="https://picsum.photos/id/{i}/200/300" />
      </div>
    {/each}
  </div>
{:else}
  <h1 class="t-center my-3">Log in to see the images</h1>
{/if}

<style>
  .my-3 {
    margin-top: 3rem;
    margin-bottom: 3rem;
  }
  .grid {
    text-align: center;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
  }
  .t-center {
    text-align: center;
  }
</style>
