<script lang="ts">
	import { registerSchema } from './registerSchema';
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import { ZodError } from 'zod';
	import InputCustom from '$lib/components/InputCustom.svelte';
	import { writable } from 'svelte/store';

	export let form;
	const formStore = writable(form);
	$: formStore.set(form);

	let loading = false;

	function validateOrThrow(formdata: FormData) {
		const obj = {} as any;
		formdata.forEach((v: any, k: any) => (obj[k] = v));
		registerSchema.parse(obj);
	}

	function manageError(error: any) {
		if (error instanceof ZodError) {
			const { fieldErrors } = error.flatten();
			form = { errors: fieldErrors } as ActionData;
		}
	}
	$: showPswValue = {
		newPsw: false,
		confirmPsw: false
	};
</script>

<main class="container">
	<article class="grid">
		<div class="form-panel">
			<h1>Registro</h1>
			<form
				method="POST"
				class="register-form"
				use:enhance={({ formData }) => {
					try {
						validateOrThrow(formData);
						loading = true;
						return ({ update }) => {
							loading = false;
							update();
						};
					} catch (error) {
						manageError(error);
					}
				}}
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
						placeholder="Nombre y Apellido"
					/>
					<div class="input-row">
						<InputCustom
							{formStore}
							name="password"
							type={showPswValue.newPsw ? 'text' : 'password'}
							placeholder="Contraseña"
						/>
						<i
							class={`pointer fa-regular ${showPswValue.newPsw ? 'fa-eye-slash' : 'fa-eye'}`}
							on:click={() => (showPswValue.newPsw = !showPswValue.newPsw)}
						/>
					</div>
					<div class="input-row">
						<InputCustom
							{formStore}
							name="confirmPassword"
							type={showPswValue.confirmPsw ? 'text' : 'password'}
							placeholder="Confirmar Contraseña"
						/>
						<i
							class={`pointer fa-regular ${showPswValue.confirmPsw ? 'fa-eye-slash' : 'fa-eye'}`}
							on:click={() => (showPswValue.confirmPsw = !showPswValue.confirmPsw)}
						/>
					</div>
					{#if form?.message}
						<span class="error">{form?.message}</span>
					{/if}
				</div>
				<button
					type="submit"
					class="contrast submit-btn"
					typeof="submit"
					aria-busy={loading}>Registrarse</button
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
			width: 100%;
			.form-panel {
				display: flex;
				justify-content: space-between;
				align-items: space-between;
				flex-direction: column;
				height: 100%;
				width: 100%;
				.inputs {
					width: 100%;
				}
				h1 {
					margin-bottom: 1rem;
				}
			}
		}
	}
	.input-row {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		i {
			width: 30px;
			margin-left: 1rem;
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
