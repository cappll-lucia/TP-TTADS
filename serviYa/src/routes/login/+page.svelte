<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { enhance } from '$app/forms';
	export let data;
	export let form: ActionData;
	let loading = false;
</script>

<main class="container">
	<article class="grid">
		<div>
			<hgroup>
				<h1>Login</h1>
			</hgroup>
			<form
				method="POST"
				use:enhance={() => {
					loading = true;
					return ({ update }) => {
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
					placeholder="email"
					aria-label="Username"
					required
				/>
				{#if form?.message === 'AUTH_INVALID_PASSWORD'}
					<span class="error">Clave incorrecta</span>
				{/if}
				<input
					type="password"
					name="password"
					placeholder="Password"
					aria-label="Password"
					autocomplete="current-password"
					required
				/>

				<button
					type="submit"
					class="contrast"
					typeof="submit"
					aria-busy={loading}>Log in</button
				>
			</form>

			<p>No tienes una cuenta <a href="/register">Register</a></p>
		</div>
		<div id="login-img" />
	</article>
</main>

<style lang="scss">
	.container {
		height: calc(100vh - 80px);
		.grid {
			margin-top: 60px;
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
</style>
