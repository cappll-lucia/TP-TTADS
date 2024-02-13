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

	$: showInputValue = {
		newPsw: false,
		confirmPsw: false
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
						<div class="input-row">
							<InputCustom
								{formStore}
								name="password"
								default_value={psw.newPsw}
								placeholder="Nueva contraseña"
								type={showInputValue.newPsw ? 'text' : 'password'}
							/>
							<i
								class={`pointer fa-regular ${showInputValue.newPsw ? 'fa-eye-slash' : 'fa-eye'}`}
								on:click={() => (showInputValue.newPsw = !showInputValue.newPsw)}
							/>
						</div>
						<div class="input-row">
							<InputCustom
								{formStore}
								default_value={psw.newPsw}
								name="confirmPassword"
								type={showInputValue.confirmPsw ? 'text' : 'password'}
								placeholder="Confirmar contraseña"
							/>
							<i
								class={`pointer fa-regular ${
									showInputValue.confirmPsw ? 'fa-eye-slash' : 'fa-eye'
								}`}
								on:click={() => (showInputValue.confirmPsw = !showInputValue.confirmPsw)}
							/>
						</div>
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
	{:else if form?.message === 'RESET_PASSWORD_FAILED'}
		<article class="grid grid-failure">
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
	.grid-success,
	.grid-failure {
		width: 80%;
		margin-left: 10%;
	}
	.grid-failure .notification {
		height: 8rem;
	}
	#login-img {
		background-image: url('../../ai.profClient.png');
		background-position: center;
		background-size: contain;
	}
	.notification {
		height: 13rem;
		hgroup {
			h3 {
				margin-bottom: 1.5rem;
			}
			p {
				font-size: large;
			}
		}
	}
	.grid-success .notification,
	.grid-failure .notification {
		height: 12rem;
		width: 100%;
	}

	@media (max-width: 1024px) {
		.container {
			width: 85%;
		}
		.notification {
			height: 10rem;
		}
	}

	@media (max-width: 768px) {
		.container {
			width: 100%;
		}
		.grid-success,
		.grid-failure,
		.grid {
			width: 100%;
			margin-left: 0;
		}
		.grid-success .notification,
		.grid-failure .notification {
			height: 10rem;
		}
	}
	@media (max-width: 600px) {
		.notification {
			height: 11rem;
			hgroup {
				h3 {
					font-size: large;
				}
				p {
					font-size: medium;
				}
			}
		}
		.container,
		.container-fluid {
			padding-right: 10px;
			padding-left: 10px;
		}
		.grid-success .notification,
		.grid-failure .notification {
			height: 8rem;
		}
	}
	@media (max-width: 450px) {
		.notification {
			height: 12rem;
			hgroup {
				h3 {
					font-size: medium;
				}
			}
		}
		.notification-success {
			height: 6rem;
		}
		.container,
		.container-fluid {
			padding-right: 10px;
			padding-left: 10px;
		}
	}
</style>
