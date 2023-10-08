<script lang="ts">
	import type { City } from '../../types';
	import { capitalize } from '$lib/utils';
	import { fade, slide } from 'svelte/transition';

	let cities = [] as City[];
	export let value: City | null;
	let hasBeenJustFound = false;
	let hide = true;

	function showCityDescription(x: City | null) {
		return x ? capitalize(x.name) + ', ' + capitalize(x.province) : '';
	}

	function select(selectedCity: City) {
		value = selectedCity;
		searchTerm = showCityDescription(selectedCity);
		hasBeenJustFound = true;
		cities = [];
	}

	let searchTerm = '';
	const abortCont = {
		last: new AbortController(),
		next: new AbortController(),
		swap() {
			this.last = abortCont.next;
			this.next = new AbortController();
		}
	};
	$: {
		if (searchTerm === '') {
			cities = [];
		}
		if (searchTerm.length >= 2 && !hasBeenJustFound) {
			abortCont.last.abort();
			const url = `http://localhost:3000/api/city?name=${searchTerm}`;

			fetch(url, { signal: abortCont.next.signal })
				.then((rawRes) => rawRes.json())
				.then(({ result }) => {
					cities = result;
				})
				.catch((err) => {
					if (err.name !== 'AbortError') {
						console.error(err);
					}
				});
			abortCont.swap();
		} else {
			hasBeenJustFound = false;
		}
	}

	let indexSelected = -1;
	function keyboardNavigate(event: KeyboardEvent) {
		const { key } = event;
		if (key === 'Enter') {
			document.getElementById('item-' + indexSelected)?.click();
			return;
		}
		if (!(key === 'ArrowUp' || key === 'ArrowDown')) {
			return;
		}
		event.preventDefault();

		document
			.getElementById('item-' + indexSelected)
			?.animate([{ background: 'black' }], {
				duration: 150,
				easing: 'ease-out',
				fill: 'forwards'
			})
			.play();

		indexSelected = key === 'ArrowUp' ? indexSelected - 1 : indexSelected + 1;
		indexSelected = indexSelected < -1 ? -1 : indexSelected;
		indexSelected = indexSelected % cities.length;

		document
			.getElementById('item-' + indexSelected)
			?.animate([{ background: '#334' }], {
				duration: 100,
				easing: 'ease-in-out',
				fill: 'forwards'
			})
			.play();
	}

	function onFocus(e: any) {
		e.target.select();
		hide = false;
	}
</script>

<input
	bind:value={searchTerm}
	on:focusin={onFocus}
	on:input={() => (indexSelected = -1)}
	on:keydown={keyboardNavigate}
/>
{#if !hide && searchTerm !== '' && cities.length !== 0}
	<ul transition:slide={{ duration: 300 }}>
		{#each cities as c, i}
			<li>
				<a
					id={'item-' + i}
					on:click={() => select(c)}
				>
					{showCityDescription(c)}
				</a>
			</li>
		{/each}
	</ul>
{/if}

<style>
	ul {
		width: 17rem;
		display: flex;
		flex-direction: column;
		background: black;
		position: absolute;
	}
	li {
		width: 100%;
	}

	li:hover {
		background: #334;
	}
</style>
