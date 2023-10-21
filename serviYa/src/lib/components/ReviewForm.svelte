<script lang="ts">
	import type { Review } from '../../types';
	export let review: any;
	import { enhance } from '$app/forms';

	let mode: string = 'visible';

	const reviewDate = (date: Date) =>
		`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}   ${date.getHours()}:${date.getMinutes()}`;
</script>

<div class="review">
	<div class="name_and_date">
		<span typeof="name">{review.author.name}</span>
		{#if mode != 'edit'}
			{#if review.edited_at}
				<span typeof="date">Editado {reviewDate(review.edited_at)}</span>
			{:else}
				<span typeof="date">{reviewDate(review.created_at)}</span>
			{/if}
		{/if}
	</div>
	<span typeof="email">{review.author.email}</span>
	{#if mode != 'edit'}
		<div class="score">
			{#each Array(review.score) as _}
				<i class="fas fa-star" />
			{/each}
		</div>
	{/if}
	<div class="forms">
		<form
			action="?/editReview"
			method="POST"
			class="edit_review_form"
			use:enhance
			on:reset={() => {
				mode = 'visible';
			}}
		>
			{#if mode == 'edit'}
				<div class="editable_score">
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
			{/if}
			<input
				type="text"
				name="comment"
				value={review.comment}
				class={mode}
				disabled={mode === 'visible'}
			/>
			<input
				type="text"
				name="id"
				value={review.id}
				hidden
			/>
			{#if mode == 'edit'}
				<div class="action_panel">
					<button
						class="review_close_button"
						on:click={() => {
							mode = 'visible';
						}}><i class="mi mi-close" /></button
					>
					<button
						type="submit"
						class="review_save_button"><i class="mi mi-circle-check" /></button
					>
				</div>
			{/if}
		</form>
		{#if mode != 'edit'}
			<form
				action="?/deleteReview"
				method="POST"
				class="delete_review_form"
				use:enhance
			>
				<input
					type="text"
					name="id"
					value={review.id}
					hidden
				/>
				<button
					class="review_edit_button"
					on:click={() => {
						mode = 'edit';
					}}><i class="mi mi-edit" /></button
				>
				<button
					on:click={(e) => {
						if (!confirm('estas seguro?')) {
							e.preventDefault();
						}
					}}
					type="submit"
					class="review_delete_button"><i class="mi mi-delete" /></button
				>
			</form>
		{/if}
	</div>
</div>

<style lang="scss">
	.review {
		width: 20rem;
		height: 13rem;
		padding: 1rem;
		border-radius: 24px;
		background-color: #374956;
		display: flex;
		flex-direction: column;
		margin: 1rem;
		.name_and_date {
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			font-size: 1.1rem;
			height: 1.1rem;
			margin: 0;
			span[typeof='name'] {
				font-weight: bold;
				margin: 0;
				padding: 0;
			}
			span[typeof='date'] {
				font-size: 0.8rem;
				color: gray;
				margin: 0;
			}
		}
		span[typeof='email'] {
			font-size: 0.9rem;
			color: gray;
			margin-bottom: 0.5rem;
		}
		.score {
			padding: 0.2rem 0 0.8rem 0;
			color: #fce448;
			i {
				padding-right: 0.3rem;
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

	.edit_review_form {
		margin: 0;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		.action_panel {
			height: 2rem;
			margin: 0;
			display: flex;
			flex-direction: row;
			justify-content: flex-end;
			gap: 1.5rem;
		}
		input {
			padding: 0.5rem;
		}
	}
	.delete_review_form {
		height: 2rem;
		margin: 0;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		gap: 1.5rem;
	}
	.review_edit_button,
	.review_save_button,
	.review_close_button,
	.review_delete_button {
		background-color: transparent;
		border: none;
		width: 1rem;
		height: 2rem;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0;
		cursor: pointer;
		i {
			font-size: 1.2rem;
		}
	}
	.review_save_button {
		color: #7cb342;
		i {
			font-size: 2.3rem;
		}
	}
	.visible {
		background-color: transparent;
		border: none;
		margin-bottom: 0.4rem;
	}
</style>
