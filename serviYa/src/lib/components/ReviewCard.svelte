<script lang="ts">
	import type { Review } from '../../types';
	export let review: any;

	const reviewDate = `${review.created_at.getDate()}/${review.created_at.getMonth()}/${review.created_at.getFullYear()}   ${review.created_at.getHours()}:${review.created_at.getMinutes()}`;
</script>

<div class="review">
	<div class="name_and_date">
		<span typeof="name">{review.author.name}</span>
		<span typeof="date">{reviewDate}</span>
	</div>
	<span typeof="email">{review.author.email}</span>
	<div class="score">
		{#each Array(review.score) as _}
			<i class="fas fa-star" />
		{/each}
	</div>
	<span typeof="comment">{review.comment}</span>
</div>

<style lang="scss">
	.review {
		width: 20rem;
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
			padding: 0.2rem 0 0.5rem 0;
			color: #fce448;
			i {
				padding-right: 0.3rem;
			}
		}
		span[typeof='comment'] {
			padding: 0.5rem;
			height: 4rem;
			font-style: italic;
			display: flex;
			align-items: flex-start;
		}
	}
</style>
