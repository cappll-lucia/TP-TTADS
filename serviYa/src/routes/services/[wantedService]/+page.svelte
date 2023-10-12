<script lang="ts">
	import ProfessionalsGallery from '$lib/components/ProfessionalsGallery.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	// TODO - ver como obtener la provincia y localidad del usuario para usarla en la query
	const professionalsList = data.professionalsList;
	const wantedService = data.service;
</script>

<main class="container">
	{#if professionalsList.length > 0}
		<h1>Profesionales disponibles para {wantedService}</h1>
		<ProfessionalsGallery professionalList={professionalsList} />
	{:else}
		<h1>No hay profesionales disponibles para {wantedService}</h1>
		<p>¿Quieres ser el primero?</p>
		<a
			role="button"
			href="#">Registrate aqui!</a
		>
		<!-- todo - link a registro de profesional -->
	{/if}
</main>
