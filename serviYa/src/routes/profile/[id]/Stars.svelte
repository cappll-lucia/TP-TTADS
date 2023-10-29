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

<style lang="scss">
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
</style>
