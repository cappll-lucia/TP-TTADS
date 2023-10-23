<script lang="ts">
	import ProfessionalsGallery from '$lib/components/ProfessionalsGallery.svelte';
	import type { City } from '@prisma/client';
	import type { PageData } from './$types';
	import type { Writable } from 'svelte/store';
	import { getContext } from 'svelte';

	export let data: PageData;
	const professionalsList = data.professionalsList;
	const wantedService = data.service;
	let city = getContext('city') as Writable<City>;
</script>

<main class="container">
	{#if professionalsList.length > 0}
		<h1>
			Profesionales disponibles para {wantedService} en {$city.name}, {$city.province}
		</h1>
		<ProfessionalsGallery professionalList={professionalsList} />
	{:else}
		<h1>No hay profesionales disponibles para {wantedService} en {$city.name}, {$city.province}</h1>
		<p>¿Quieres ser el primero?</p>
		<a
			role="button"
			href="#">Registrate aqui!</a
		>
		<!-- todo - link a registro de profesional -->
	{/if}
</main>
