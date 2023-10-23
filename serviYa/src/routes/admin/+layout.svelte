<script lang="ts">
	import { navigating, page } from '$app/stores';
	import { blur } from 'svelte/transition';
</script>

<nav>
	<ul>
		<li><a href="/admin/service">Services</a></li>
		<li><a href="/admin/city">Cities</a></li>
		<li><a href="/admin/province">Provinces</a></li>
	</ul>
</nav>

{#if !$navigating}
	{#key $page.url.pathname}
		<div>
			<slot />
		</div>
	{/key}
{:else}
	<div>
		<div
			style="margin: 20%; font-size: 5rem;"
			aria-busy="true"
		/>
	</div>
{/if}

<style lang="scss">
	ul {
		display: flex;
		gap: 1rem;
	}
	nav {
		margin-right: 2rem;
		margin-left: 2rem;
		padding-left: 6rem;
		border: 1px solid gray;
		border-top: none;
		border-radius: 0 0 5rem 5rem;
		text-align: center;
	}
</style>
