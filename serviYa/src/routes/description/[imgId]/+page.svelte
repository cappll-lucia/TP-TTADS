<script lang="ts">
  export let data;
  import { images } from "../../../data/random_data";
  const { id_img_param } = data;
  const imgData = images.find((img) => (img.img_id == id_img_param)) ;
  import Img from '$lib/components/Image/Img.svelte';
	import { page } from '$app/stores';
</script>

<h1>Image Description</h1>
<p>{JSON.stringify($page)}</p>
<div class="container-fluid">
  {#if imgData}
  <Img {imgData} />
  {/if}
  <a href="/">Volver al menu</a>
</div>
