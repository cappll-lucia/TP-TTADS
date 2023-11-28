<script lang="ts">
	import { enhance } from '$app/forms';
	import InputCustom from '$lib/components/InputCustom.svelte';
	import { ZodError } from 'zod';
	import { writable, type Writable } from 'svelte/store';
	import type { PageData } from '../$types';
	import { goto } from '$app/navigation';
	import { resetPasswordSchema } from './resetPasswordSchema';
	import type { Form } from '$lib/components/types';
	import { getContext } from 'svelte';

	export let form: Form;
	const formStore = writable(form);
	$: formStore.set(form);

	let loading = false;
	let entering = false;

	export let data: PageData;
	const psw = {
		newPsw: '',
		confirmPsw: ''
	};

	const validate_or_throw = (formData: FormData) => {
		const obj = {} as any;
		formData.forEach((v: any, k: any) => (obj[k] = v));
		resetPasswordSchema.parse(obj);
	};

	const manage_error = (error: any) => {
		if (error instanceof ZodError) {
			const { fieldErrors } = error.flatten();
			form = { errors: fieldErrors } as any;
		}
	};
</script>

<main class="container">
	{#if !entering}
		<article class="grid">
			<div class="form-panel">
				<hgroup>
					<h1>Reestablecer contraseña</h1>
					<p>Ingrese su nueva contraseña</p>
				</hgroup>
				<form
					method="POST"
					class="register-form"
					use:enhance={({ formData }) => {
						try {
							validate_or_throw(formData);
							loading = true;
							return async ({ update, result }) => {
								entering = result.type === 'success';
								console.log('first');
								loading = false;
								update();
							};
						} catch (error) {
							manage_error(error);
						}
					}}
				>
					<div class="inputs">
						<InputCustom
							{formStore}
							default_value={psw.newPsw}
							name="password"
							type="text"
							placeholder="Nueva contraseña"
						/>
						<InputCustom
							{formStore}
							default_value={psw.newPsw}
							name="confirmPassword"
							type="text"
							placeholder="Confirmar contraseña"
						/>
					</div>
					<div class="actions">
						<button
							type="submit"
							class="submit-btn"
							typeof="submit"
							disabled={entering}
							aria-busy={loading}>Cambiar Contraseña</button
						>
					</div>
				</form>
			</div>
		</article>
	{:else if form?.success}
		<article class="grid grid-success">
			<div class="notification">
				<hgroup>
					<h3>Contraseña Reestablecida</h3>
					<p>
						Su contraseña ha sido reestablecida con éxito.<br />Ahora puede iniciar sesión con su
						nueva contraseña desde
						<a
							href="/login"
							class="pointer">aquí</a
						>
					</p>
				</hgroup>
			</div>
		</article>
	{:else if form?.message === 'EXPIRED_TOKEN' || form?.message === 'INVALID_TOKEN'}
		<article class="grid">
			<div class="notification">
				<hgroup>
					<h3>TOKEN INVÁLIDO o EXPIRADO</h3>
					<p>
						El token con el que intentó restablecer su contraseña es inválido o ha expirado.
						Recuerde que el token es válido durante 10 minutos.<br />Solicite un nuevo token desde
						<a
							href="/resetPassword"
							class="pointer">aquí</a
						>
					</p>
				</hgroup>
			</div>
		</article>
	{:else}
		<article class="grid">
			<div class="notification">
				<hgroup>
					<h3>Ocurrió un error al Reestablecer su contraseña</h3>
					<p>
						Vuelva a intentarlo más tarde o solicite un nuevo token desde
						<a
							href="/resetPassword"
							class="pointer">aquí</a
						>
					</p>
				</hgroup>
			</div>
		</article>
	{/if}
</main>

<style lang="scss">
	.error {
		font-size: medium;
		color: red;
		position: relative;
		display: inline-block;
		height: 2rem;
		margin: 0;
	}
	.container {
		height: calc(100vh - 80px);
		width: 50%;
		.grid {
			margin-top: 40px;
			form {
				input {
					margin: 0;
				}
				.error {
					font-size: medium;
					color: red;
				}
				button {
					margin-top: 1rem;
				}
			}
		}
	}
	.grid-success {
		width: 80%;
		margin-left: 10%;
	}
	#login-img {
		background-image: url('../../ai.profClient.png');
		background-position: center;
		background-size: contain;
	}
	.notification {
		height: 15rem;
		hgroup {
			h3 {
				margin-bottom: 1.5rem;
			}
			p {
				font-size: x-large;
			}
		}
	}
	.notification-success {
		height: 10rem;
	}

	@media (max-width: 768px) {
		.container {
			width: 100%;
		}
		.grid-success {
			width: 100%;
			margin-left: 0;
		}
	}
</style>
