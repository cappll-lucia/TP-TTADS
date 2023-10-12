<script lang="ts">
    export let data: PageData;
    import ProfessionalsGallery from '$lib/components/ProfessionalsGallery.svelte';
	import type { PageData } from './$types';
    // TODO - ver como obtener la provincia y localidad del usuario para usarla en la query
</script>

<main class="container">
    <h1 >Profesionales disponibles para {data.service}</h1>
    <ProfessionalsGallery professionalList={data.profs} />
</main>