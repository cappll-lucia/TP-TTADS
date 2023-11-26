<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidate, invalidateAll } from '$app/navigation';
	import type { PageData } from './$types';
	import { capitalize } from '$lib/utils.ts';
	export let data: PageData;

	//flags
	let showPending = false;
	let showConfirmed = false;

	$: pendingAppointments = data.pendingAppointments;
	$: otherAppointments = data.otherAppointments;
	$: confirmedAppointments = data.confirmedAppointments;

	let modal: HTMLElement;
	let appointment_data = { id: '', description: '' };

	const closeModal = () => {
		modal.attributes.removeNamedItem('open');
		appointment_data.description = '';
	};

	const setUpModal = (app: { id: string; description: string }) => {
		appointment_data.description = app.description;
		appointment_data.id = app.id;
		modal.setAttribute('open', 'true');
	};

	const formatDate = (date: string) => {
		const originalDate = new Date(date);
		const options = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
		const formatedDate = originalDate.toLocaleDateString('es-ES', options);
		return capitalize(formatedDate);
	};
	const formatDateTime = (date: string) => {
		const originalDate = new Date(date);
		const hours = originalDate.getHours().toString().padStart(2, '0');
		const minutes = originalDate.getMinutes().toString().padStart(2, '0');
		return `${hours}:${minutes}`;
	};
</script>

<dialog
	class="p-4 rounded-lg"
	id="modal"
	bind:this={modal}
>
	<article>
		<form
			method="post"
			use:enhance={() => {
				return ({ update, action }) => {
					console.log(action.search);
					console.log(action.search === '?/reject');
					alert(action.search === '?/reject' ? 'Turno rechazado' : 'Turno aceptado');
					modal.attributes.removeNamedItem('open');
					update();
				};
			}}
		>
			<header>
				<a
					href="#"
					on:click|preventDefault={closeModal}><i class="mi-close" /></a
				>
				<h3>Detalles del Turno</h3>
			</header>
			<input
				name="appointment_id"
				value={appointment_data?.id || ''}
				hidden
			/>
			<p>{appointment_data?.description || ''}</p>
			<footer>
				<button
					class="cancel outline"
					type="submit"
					formaction="?/reject"
					on:click={(event) => {
						if (!confirm('Esta seguro de cancelar?')) {
							event.preventDefault();
						}
					}}
				>
					Rechazar
				</button>
				<button
					type="submit"
					class="accept"
					formaction="?/confirm"
				>
					Aceptar
				</button>
			</footer>
		</form>
	</article>
</dialog>

<main class="container">
	<h1>Turnos</h1>
	<article class="appointment-lists">
		<h3 class=" text-xl text-center">Pendientes de confirmacion</h3>
		{#if pendingAppointments.length === 0}
			<p class="mt-5 text-xl">No hay turnos pendientes de confirmacion</p>
		{:else}
			{#if !showPending}
				<button
					class="md:hidden mt-3"
					on:click={() => {
						showPending = !showPending;
						document.querySelector('.not-confirmed')?.classList.remove('hidden');
						document.querySelector('.not-confirmed')?.classList.add('grid');
					}}>Ver pendientes</button
				>
			{:else}
				<button
					class="md:hidden border-red-600 mt-3"
					on:click={() => {
						showPending = !showPending;
						document.querySelector('.not-confirmed')?.classList.remove('grid');
						document.querySelector('.not-confirmed')?.classList.add('hidden');
					}}>Ocultar pendientes</button
				>
			{/if}
			<div class="not-confirmed hidden grid-cols-1 md:grid md:grid-cols-2 md:gap-4">
				{#each pendingAppointments as app (app.id)}
					<div>
						<div class="content">
							<h4>{formatDate(app.date)}</h4>
							<h5>{formatDateTime(app.date)}</h5>
							<!-- <p>{app.description}</p> -->
							<button on:click={() => setUpModal(app)}
								><span>Detalles</span> <i class="mi mi-arrow-right" /></button
							>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</article>
	<article class="appointment-lists">
		<h3 class="text-xl text-center">Por realizar</h3>
		{#if confirmedAppointments.length === 0}
			<h3 class="mt-5 text-lg">No hay turnos por realizar</h3>
		{:else}
			{#if !showConfirmed}
				<button
					class="md:hidden mt-3"
					on:click={() => {
						showConfirmed = !showConfirmed;
						document.querySelector('.confirmed')?.classList.remove('hidden');
						document.querySelector('.confirmed')?.classList.add('grid');
					}}>Ver confirmados</button
				>
			{:else}
				<button
					class="md:hidden border-red-600 mt-3"
					on:click={() => {
						showConfirmed = !showConfirmed;
						document.querySelector('.confirmed')?.classList.remove('grid');
						document.querySelector('.confirmed')?.classList.add('hidden');
					}}>Ocultar confirmados</button
				>
			{/if}
			<div class="confirmed hidden grid-cols-1 md:grid md:grid-cols-2 md:gap-4">
				{#each confirmedAppointments as app (app.id)}
					<div>
						<div class="content">
							<h4>{formatDate(app.date)}</h4>
							<h5>{formatDateTime(app.date)}</h5>
							<p>{app.description}</p>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</article>
	<article>
		<h2>Historial</h2>
		{#each otherAppointments as app (app.id)}
			<div>
				<h4>{formatDate(app.date)}</h4>
				<h5>{formatDateTime(app.date)}</h5>
				<p>{app.description}</p>
				<p>{app.state}</p>
			</div>
		{/each}
	</article>
</main>

<style lang="scss">
	.appointment-lists {
		width: 100%;
		.confirmed,
		.not-confirmed {
			padding: 1rem;
			h3 {
				padding-left: 1rem;
			}
			div {
				padding-left: 1rem;
				margin-top: 1rem;
				min-height: 10rem;
				border-radius: 10px;
				.content {
					background: var(--card-background-color);
					display: flex;
					flex-direction: column;
					padding: 1rem 0 1rem 1rem;
					h4 {
						width: 100%;
						margin-bottom: 5px;
					}
					h5 {
						width: 100%;
						color: gray;
						margin-bottom: 15px;
					}
					p {
						width: 100%;
						font-style: italic;
					}
					button {
						width: 7rem;
						height: 2rem;
						padding: 5px;
						border: none;
						display: flex;
						align-items: center;
						justify-content: space-evenly;
						background-color: transparent;
						border-radius: unset;
						color: #f4511e;
						border-bottom: solid #f4511e 2px;
						margin-bottom: 0;
						margin-top: 1rem;
						i {
							display: flex;
							align-items: center;
						}
					}
				}
			}
		}
	}
	.not-confirmed {
		div {
			background-color: #f4511e;
			.content {
				border-radius: 0px 10px 10px 0px;
				border: solid #f4511e 2px;
			}
		}
	}
	.confirmed {
		div {
			background-color: var(--primary);
			.content {
				border-radius: 0px 10px 10px 0px;

				border: solid var(--primary) 2px;
			}
		}
	}
	.cancel {
		border-color: red;
		color: red;
	}

	#modal {
		article {
			width: 100%;
			padding: 1rem;
			header {
				display: flex;
				flex-direction: column;
				width: 100%;
				align-items: flex-end;
				padding: 0;
			}
			h3 {
				margin-bottom: 1rem;
				width: 100%;
				text-align: left;
			}
			p {
				width: 80%;
				padding-left: 10%;
				font-style: italic;
				min-height: 5rem;
			}
			footer {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				padding: 0;
				margin-bottom: 0;
				button {
					margin-bottom: 0;
					width: 48%;
				}
			}
			form {
				margin: 0;
			}
		}
	}
	@media (max-width: 768px) {
		.appointment-lists {
			flex-direction: column;
			.confirmed,
			.not-confirmed {
				width: 100%;
			}
		}
	}
	@media (max-width: 1199px) and (min-width: 769px) {
		.appointment-lists {
			.confirmed {
				h3 {
					height: 4.5rem;
				}
			}
		}
	}
</style>
