<script lang="ts">
	import { getContext } from 'svelte';
	import type { PageData } from '../../routes/$types';
	import type { City } from '../../types';
	import AutocompleteCityNavbar from './AutocompleteCityNavbar.svelte';
	import type { Writable } from 'svelte/store';
	import { page } from '$app/stores';
	export let data: PageData;
	let city = getContext('city') as Writable<City>;
</script>

<nav class=" navbar px-4">
	<div class="serviya-logo">
		<img
			alt="logo"
			height="40px"
			width="40px"
			src="/shazam.png"
		/>
		<a href="/">ServiYa</a>
	</div>

	<div style="padding:30px;">
		{#if data.user && data.user.role !== 'ADMIN' && $page.url.pathname == '/'}
			{#key $page.url.pathname}
				<AutocompleteCityNavbar bind:value={$city} />
			{/key}
		{/if}
	</div>
	{#if data.user && data.user.role === 'USER' && $page.url.pathname != '/profesional'}
		<div>
			<a
				role="button"
				href="/profesional"
				style="width: max-content;"
				>Quiero prestar un servicio
			</a>
		</div>
	{/if}
	<div class="usr-menu">
		{#if data.user}
			<li style="width: max-content;">Bienvenido, {data?.user?.name}!</li>
		{/if}
		<details
			class="menu"
			role="list"
		>
			<summary aria-haspopup="listbox">
				<i class="fa-regular fa-user" />
			</summary>
			<ul
				role="listbox"
				class="listbox"
			>
				{#if !data.user}
					<li>
						<a href="/register">Register</a>
					</li>
					<li>
						<a href="/login">Log in</a>
					</li>
				{:else}
					{#if data.user.role === 'PROFESIONAL'}
						<li>
							<a href="/panelTurnos">Panel de turnos</a>
						</li>
					{/if}
					<li><a href="/misTurnos">Mis Turnos</a></li>
					<li>
						<a href="/editme">Editar datos</a>
					</li>
					<li class="logout-btn">


					<form
						method="POST"
						class="listbox"
					>
						<button
							on:click={(e) => confirm('estas seguro?') || e.preventDefault()}
							class="button-as-anchor"
							formaction="/logout"
							type="submit"
							>LogOut
						</button>
					</form>
					</li>

				{/if}
			</ul>
		</details>
	</div>
</nav>

<style lang="scss">
	.navbar {
		width: 100%;
		height: 80px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
		.serviya-logo {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 60px;
			font-size: 1.2rem;
			font-weight: 600;
			padding-left: 2rem;
			a {
				margin-left: 5px;
				background-color: transparent;
			}
		}
		.usr-menu {
			width: max-width;
			height: 60px;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			padding-right: 2rem;
			.menu {
				width: 3.5rem;
				margin: 0 0 0 30px;
				.listbox {
					left: -4.5rem;
					width: 8rem;

					form {
						margin: 0;
						display: flex;
						flex-direction: column;
						align-items: center;
						button {
							margin-top: 3px;
							width: 8rem;
							text-align: left;
						}
						a {
							text-decoration: none;
							text-align: left;
							color: var(--dropdown-color);
						}
					}
				}
				.logout-btn:hover{
					background-color: rgba(36, 51, 62, 0.75);
				}
			}
		}
	}
	.button-as-anchor {
		margin: 0;
		padding: 0;
		background: none;
		border: none;
		padding: 0;
		margin: 0;
		font: inherit;
		cursor: pointer;
		color: var(--dropdown-color);
		text-decoration: underline;
		width: 100%;
		text-decoration: none;
	}
	.button-as-anchor:hover,
	.button-as-anchor:focus {
		cursor: pointer;
		outline: none;
	}
</style>
