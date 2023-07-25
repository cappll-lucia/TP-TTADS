<script lang="ts">
  export let data;
  import { images } from "../../../data/random_data";
  const { id_img_param } = data;
  const imgData = images.find((img) => (img.img_id == id_img_param));
  import Img from '$lib/components/Image/Img.svelte'
</script>

<h1>Image Description</h1>
<div class="container-fluid">
  <Img {imgData} />
  <a href="/">Volver al menu</a>
</div>
