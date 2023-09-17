<script lang="ts">
	import { registerSchema } from './registerSchema';
	import { enhance } from '$app/forms';
	import InputCustom, { type Form } from '$lib/components/InputCustom.svelte';
	import { writable, type Writable } from 'svelte/store';
	import { default_enhance } from '$lib/utils';

	export let form;
	const formStore = writable(form) as Writable<Form>;
	$: formStore.set(form as Form);

	let loading = false;
</script>

<main class="container">
	<article class="grid">
		<div class="form-panel">
			<hgroup>
				<h1>Registro</h1>
			</hgroup>
			<form
				method="POST"
				class="register-form"
				use:enhance={default_enhance({ zodSchema: registerSchema, loading, formStore })}
			>
				<div class="inputs">
					<InputCustom
						{formStore}
						name="email"
						type="email"
						placeholder="Email"
					/>
					<InputCustom
						{formStore}
						name="name"
						type="text"
						placeholder="Name"
					/>
					<InputCustom
						{formStore}
						name="password"
						type="password"
						placeholder="Password"
					/>
					<InputCustom
						{formStore}
						name="confirmPassword"
						type="password"
						placeholder="Confirm Password"
					/>
					{#if form?.message}
						<span class="error">{form?.message}</span>
					{/if}
				</div>
				<button
					type="submit"
					class="contrast submit-btn"
					typeof="submit"
					aria-busy={loading}>Register</button
				>
			</form>
		</div>
		<div id="register-img" />
	</article>
</main>

<style lang="scss">
	.container {
		display: flex;
		height: 40rem;
		justify-content: center;
		padding: 2rem 0;
		align-items: flex-start;
		z-index: 0;
		.grid {
			.form-panel {
				display: flex;
				justify-content: space-between;
				align-items: space-between;
				flex-direction: column;
				height: 100%;
				h1 {
					font-size: 2rem;
				}
			}
		}
	}
	#register-img {
		background-image: url('../../ai.profClient.png');
		background-position: center;
		background-size: cover;
	}
	.register-form {
		--form-element-spacing-vertical: 0.5rem;
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		margin-bottom: 0;
		.inputs {
			width: 80vw;
		}
		.submit-btn {
			margin-bottom: 0;
		}
	}
	.error {
		font-size: small;
		color: red;
		position: relative;
		display: inline-block;
		height: 2rem;
		margin: 0;
	}
</style>
