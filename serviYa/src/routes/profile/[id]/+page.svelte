<script lang="ts">
	import { writable } from 'svelte/store';
	import type { PageData } from './$types';
	export let data: PageData;
	const { profesional, available_turns } = data;
	export let form;
</script>

{#if form?.success}
	<mark class="ctr">{'Turno agendado con éxito para el dia '}{form.date.toLocaleDateString()}</mark>
{/if}
<main class="container">
	<article>
		<h1>{profesional.name}</h1>
		<h2>{profesional.services[0].name}</h2>
		<p>{profesional.description}</p>
	</article>

	<form
		action="?/agendar"
		method="post"
	>
		<h3>Turnos disponibles en la semana:</h3>
		<table role="grid">
			<tbody>
				{#each available_turns as turn}
					<tr>
						<td class="ctr">
							{#if turn.available}
								{turn.date.toLocaleDateString('es-AR', { dateStyle: 'full' })}
							{:else}
								<s>{turn.date.toLocaleDateString('es-AR', { dateStyle: 'full' })}</s>
							{/if}
						</td>
						<td>
							<button
								type="submit"
								name="turn"
								value={turn.date.toISOString()}
								disabled={!turn.available}
							>
								Agendar turno
							</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</form>
</main>

<style>
	.ctr {
		text-align: center;
	}
</style>
