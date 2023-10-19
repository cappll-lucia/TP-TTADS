<script lang="ts">
	import { fade, fly, slide } from 'svelte/transition';
	import type { PageData } from './$types';
	export let data: PageData;
	const { profesional, available_turns } = data;
	export let form;
	let desc = '';
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
		<label for="desc">Que trabajo requiere del profesional:</label>
		<input
			hidden
			type="text"
			name="profesional_id"
			value={profesional.id}
		/>
		<textarea
			id="desc"
			name="desc"
			placeholder="que necesita?"
			bind:value={desc}
			on:focus={() => {
				window.scroll({ top: 600, left: 0, behavior: 'smooth' });
			}}
		/>
		{#if desc.length > 3}
			<table
				role="grid"
				transition:fly={{ y: 200 }}
			>
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
		{:else}
			<div style="height: 400px;" />
		{/if}
	</form>
</main>

<style>
	.ctr {
		text-align: center;
	}
</style>
