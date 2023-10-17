<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';

	import type { PageData } from './$types';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	export let data: PageData;

	const city = writable(data.city);
	setContext('city', city);
</script>

<div class="container-fluid">
	<NavBar {data} />
	<slot />
</div>

<style>
	.container-fluid {
		width: 100%;
		padding-left: 0;
		padding-right: 0;
		display: flex;
		justify-content: center;
		flex-direction: column;
	}
</style>
