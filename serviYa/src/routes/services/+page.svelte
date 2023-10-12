<script lang="ts">
	import ServicesGallery from '$lib/components/ServicesGallery.svelte';
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>

<main class="container">
    <h1>Servicios disponibles</h1>
    <ServicesGallery data={data.allServices} />
</main>