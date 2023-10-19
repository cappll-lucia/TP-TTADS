<script lang="ts">
	import { writable } from 'svelte/store';
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import Review from '$lib/components/Review.svelte';
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

	<article class="reviews">
		<h2>Reseñas</h2>
		<div class="reviews-container">
			{#each data.reviews as review}
				<Review {review} />
			{/each}
		</div>
		<div class="new-review-form">
			<h4>Dejá tu reseña</h4>
			<form
				action="?/addReview"
				method="POST"
				use:enhance
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
							checked
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
				<input
					type="text"
					name="author_id"
					hidden
					value={data.user?.userId}
				/>
				<input
					type="text"
					name="prof_id"
					hidden
					value={data.profesional.id}
				/>
				<button type="submit">Enviar reseña</button>
			</form>
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
		}
	}

	.review-score {
		// white-space: nowrap;
		display: flex;
		align-items: center;
		width: 100%;
		height: 3rem;
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
			// animation: jump 0.5s calc(0.3s + (var(--i) - 1) * 0.15s) alternate infinite;
		}
		label:has(~ :checked) i {
			color: #faec1b;
		}
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
