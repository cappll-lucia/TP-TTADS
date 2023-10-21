<script lang="ts">
	import { writable } from 'svelte/store';
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';
	import ReviewCard from '$lib/components/ReviewCard.svelte';
	import ReviewForm from '$lib/components/ReviewForm.svelte';
	import { ZodError } from 'zod';
	import type { Review } from '@prisma/client';

	export let data: PageData;
	let mode: string = 'visible';

	export let form;
	const formStore = writable(form);
	$: formStore.set(form);

	const { profesional } = data;
	const turns = data.turns;

	function manageError(error: any) {
		if (error instanceof ZodError) {
			const { fieldErrors } = error.flatten();
			form = { errors: fieldErrors } as ActionData;
		}
	}

	const reviewDate = (r: Review) =>
		`${r.created_at.getDate()}/${r.created_at.getMonth()}/${r.created_at.getFullYear()}   ${r.created_at.getHours()}:${r.created_at.getMinutes()}`;
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
					use:enhance={({ formData }) => {
						try {
							return ({ update }) => {
								update();
							};
						} catch (error) {
							manageError(error);
						}
					}}
				>
					<div>
						<span class="review-score">
							<label
								for="rate-1"
								style="--i:1"><i class="fa-solid fa-star" /></label
							>
							<input
								type="radio"
								name="score"
								id="rate-1"
								value="1"
								checked
							/>
							<label
								for="rate-2"
								style="--i:2"><i class="fa-solid fa-star" /></label
							>
							<input
								type="radio"
								name="score"
								id="rate-2"
								value="2"
							/>
							<label
								for="rate-3"
								style="--i:3"><i class="fa-solid fa-star" /></label
							>
							<input
								type="radio"
								name="score"
								id="rate-3"
								value="3"
							/>
							<label
								for="rate-4"
								style="--i:4"><i class="fa-solid fa-star" /></label
							>
							<input
								type="radio"
								name="score"
								id="rate-4"
								value="4"
							/>
							<label
								for="rate-5"
								style="--i:5"><i class="fa-solid fa-star" /></label
							>
							<input
								type="radio"
								name="score"
								id="rate-5"
								value="5"
							/>
						</span>
					</div>
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

<style lang="scss">
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

	.review-score {
		display: flex;
		align-items: center;
		width: 100%;
		height: 2rem;
		justify-content: flex-start;
		input[type='radio'] {
			display: none;
		}
		i {
			font-size: 1.2em;
			transition: 0.3s;
			padding: 0.5rem;
		}
		label {
			margin: 0;
		}
		label:is(:hover, :has(~ :hover)) i {
			transform: scale(1.35);
			color: #fffdba;
		}
		label:has(~ :checked) i {
			color: #faec1b;
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
