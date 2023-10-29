<script lang="ts">
	import { writable } from 'svelte/store';
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';
	import ReviewCard from '$lib/components/ReviewCard.svelte';
	import ReviewForm from '$lib/components/ReviewForm.svelte';
	import { ZodError } from 'zod';
	import type { Review } from '@prisma/client';
	import { fly } from 'svelte/transition';
	import Stars from './Stars.svelte';

	export let data: PageData;
	const { profesional, available_turns } = data;

	export let form;
	const formStore = writable(form);
	$: formStore.set(form);

	function manageError(error: any) {
		if (error instanceof ZodError) {
			const { fieldErrors } = error.flatten();
			form = { errors: fieldErrors } as ActionData;
		}
	}

	const reviewDate = (r: Review) =>
		`${r.created_at.getDate()}/${r.created_at.getMonth()}/${r.created_at.getFullYear()}   ${r.created_at.getHours()}:${r.created_at.getMinutes()}`;

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

	<article class="turns">
		<table>
			<tr>
				{#each available_turns as t}
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

	<article class="reviews">
		<h2>Reseñas</h2>
		<div class="reviews-container">
			{#each data.reviews as review}
				{#if review.author_id != data.user?.userId}
					<ReviewCard {review} />
				{:else}
					<ReviewForm {review} />
				{/if}
			{/each}
		</div>
		<div class="new-review-form">
			{#if data.userWrittenReviews.length == 0 && data.user?.userId != profesional.id}
				<h4>Dejá tu reseña</h4>
				<form
					action="?/addReview"
					method="POST"
					use:enhance={() => {
						try {
							return ({ update }) => {
								update();
							};
						} catch (error) {
							manageError(error);
						}
					}}
				>
					<Stars />
					<input
						type="text"
						name="comment"
						placeholder="Comentario"
					/>
					<div class="errors">
						{#if form?.errors?.score}
							<span class="error">{form.errors.score}</span>
						{/if}
						{#if form?.errors?.comment}
							<span class="error">{form.errors.comment}</span>
						{/if}
					</div>
					<button type="submit">Enviar reseña</button>
				</form>
			{:else if data.user?.userId != profesional.id}
				<p class="existing-review-message">Ya enviaste tu reseña para éste profesional</p>
			{/if}
		</div>
	</article>
</main>

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

<style lang="scss">
	.turns {
		overflow-x: scroll;
	}
	th {
		text-align: center;
	}
	.agend {
		text-align: center;
	}
	.reviews {
		margin-bottom: 8rem;
	}

	.reviews-container {
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-around;
	}
	.new-review-form {
		width: 100%;
		margin-top: 5rem;
		display: flex;
		justify-content: space-around;
		align-items: flex-start;
		// flex-direction: column;
		h4 {
			width: 20%;
			text-align: left;
		}
		form {
			width: 60%;
			input[type='text'] {
				width: 100%;
				height: 3rem;
				margin: 1rem 0 0 0;
				padding: 0.5rem;
				border: 1px solid #ccc;
			}
			.errors {
				margin: 1rem 0;
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				align-items: flex-start;
				width: 100%;
				// height: 3rem;
				span {
					color: red;
					font-size: 0.8rem;
				}
			}
		}
	}

	.existing-review-message {
		text-align: center;
		height: 3rem;
		width: 100%;
		font-style: italic;
	}

	@keyframes jump {
		0%,
		50% {
			transform: translatey(0) scale(1.35);
		}
		100% {
			transform: translatey(0) scale(1.35);
		}
	}
</style>
