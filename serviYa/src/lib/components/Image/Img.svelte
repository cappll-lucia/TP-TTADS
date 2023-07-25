<script lang="ts">
  export let imgData: { img_id: number; description?: string } ;
  const { img_id, description } = imgData;
  const src = `https://picsum.photos/id/${img_id}/200/300`;
  console.log(imgData)
</script>

<img width="200px" height="200px" alt="img" {src} />
{#if description}
  <h3>Descripcion</h3>
  <p>{description}</p>
{/if}
