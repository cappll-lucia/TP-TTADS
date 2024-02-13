<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	export let form: ActionData;
	let loading = false;
	let entering = false;

	$: showPswValue = false;
</script>

<main class="container">
	<article class="grid">
		<div>
			<h1>Iniciar sesión</h1>
			<form
				on:reset|preventDefault
				method="POST"
				use:enhance={() => {
					loading = true;
					return ({ update, result }) => {
						entering = result.type === 'success';
						loading = false;
						update();
					};
				}}
			>
				{#if form?.message === 'AUTH_INVALID_KEY_ID'}
					<span class="error">Usuario incorrecto</span>
				{/if}
				<input
					value={form?.email ?? ''}
					type="email"
					name="email"
					placeholder="Email"
					aria-label="Username"
					required
				/>
				{#if form?.message === 'AUTH_INVALID_PASSWORD'}
					<span class="error">Clave incorrecta</span>
				{/if}
				<div class="input-row">
					<input
						type={showPswValue ? 'text' : 'password'}
						name="password"
						placeholder="Password"
						aria-label="Password"
						autocomplete="current-password"
						required
					/>
					<i
						class={`pointer fa-regular ${showPswValue ? 'fa-eye-slash' : 'fa-eye'}`}
						on:click={() => (showPswValue = !showPswValue)}
					/>
				</div>

				<button
					type="submit"
					typeof="submit"
					aria-busy={loading}>{entering ? 'Adentro' : 'Log in'}</button
				>
			</form>
			<p>Olvidó su contraseña?? <a href="/resetPassword">Reestablecer contraseña</a></p>
			<p>No tienes una cuenta?? <a href="/register">Registrate aca</a></p>
		</div>
		<div id="login-img" />
	</article>
</main>

<style lang="scss">
	.container {
		height: calc(100vh - 80px);
		.grid {
			margin-top: 20px;
			h1 {
				margin-bottom: 20px;
			}
		}
	}
	.error {
		font-size: small;
		color: red;
	}
	#login-img {
		background-image: url('../../ai.profClient.png');
		background-position: center;
		background-size: contain;
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
</style>
