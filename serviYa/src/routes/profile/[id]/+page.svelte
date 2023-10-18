<script lang="ts">
	import { writable } from 'svelte/store';
	import type { PageData } from './$types';
	export let data: PageData;
	const { profesional } = data;
	const turns = data.turns;
</script>

<main class="container">
	<article>
		<h1>{profesional.name}</h1>
		<h2>{profesional.services[0].name}</h2>
		<p>{profesional.description}</p>
	</article>

	<article class="turns">
		<table>
			<tr>
				{#each turns as t}
					<th>{t.date}</th>
				{/each}
			</tr>
			<tr>
				<td><button class="agend">Agendar</button></td>
				<td><button class="agend">Agendar</button></td>
				<td><button class="agend">Agendar</button></td>
				<td><button class="agend">Agendar</button></td>
				<td><button class="agend">Agendar</button></td>
				<td><button class="agend">Agendar</button></td>
			</tr>
		</table>
	</article>
</main>

<style>
	.turns {
		overflow-x: scroll;
	}
	th {
		text-align: center;
	}
	.agend {
		text-align: center;
		padding: 0.4rem;
		font-size: 0.98rem;
	}
</style>
