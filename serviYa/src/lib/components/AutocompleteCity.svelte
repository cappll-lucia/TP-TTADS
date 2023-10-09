<script lang="ts">
	import type { City } from '../../types';
	import { capitalize } from '$lib/utils';
	import { slide } from 'svelte/transition';
	import { fetchWithCancel } from './fetchWithCancel';

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
	$: {
		if (searchTerm === '') {
			cities = [];
		}
		if (searchTerm.length >= 2 && !hasBeenJustFound) {
			const url = `http://localhost:3000/api/city?name=${searchTerm}`;
			fetchWithCancel(url, (res) => {
				res.json().then((res) => {
					cities = res.result;
				});
			});
		} else {
			hasBeenJustFound = false;
		}
	}

	function clickSelectedItem() {
		document.getElementById('item-a-' + indexSelected)?.click();
	}
	function focusItem(index: number) {
		document.getElementById('item-' + indexSelected)?.classList.remove('focused');
		document.getElementById('item-' + index)?.classList.add('focused');
		indexSelected = index;
	}

	let indexSelected = -1;
	function keyboardNavigate(event: KeyboardEvent) {
		const { key } = event;
		if (key === 'Enter') return clickSelectedItem();
		if (!(key === 'ArrowUp' || key === 'ArrowDown')) return;

		event.preventDefault();
		let newIndex = key === 'ArrowDown' ? indexSelected + 1 : indexSelected - 1;
		newIndex = newIndex < -1 ? -1 : newIndex % cities.length;
		focusItem(newIndex);
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
			<li
				class={false ? 'focused' : ''}
				id={'item-' + i}
				on:focus={() => focusItem(i)}
				on:mouseover={() => focusItem(i)}
			>
				<a
					id={'item-a-' + i}
					href={null}
					on:click={() => select(c)}
				>
					{showCityDescription(c)}
				</a>
			</li>
		{/each}
	</ul>
{/if}

<style lang="scss">
	a {
		width: 100%;
		height: 100%;
		color: var(--text-color);
	}

	input {
		margin: 0;
	}

	ul {
		margin: 0;
		width: 17rem;
		display: flex;
		flex-direction: column;
		background: var(--contrast-inverse);
		position: absolute;
		box-shadow: var(--card-box-shadow);
		border-radius: 0.2rem;
	}

	li {
		width: 100%;
	}

	.focused {
		color: var(--primary);
		background: var(--secondary);
		border-radius: 0.2rem;
	}

	li:hover {
		@extend .focused;
	}
</style>
