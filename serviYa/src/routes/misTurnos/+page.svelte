<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import { capitalize } from '$lib/utils';
	export let data: PageData;

	$: pendingAppointments = data.pendingAppointments;
	$: otherAppointments = data.otherAppointments;
	$: rejectedAppointments = data.rejectedAppointments;
	$: confirmedAppointments = data.confirmedAppointments;

	let modal: HTMLElement;
	let appointment_data: any = {};
	let appointment_type_selected: string;

	const closeModal = () => {
		modal.attributes.removeNamedItem('open');
		appointment_data.description = '';
	};

	const setUpModal = (app: any) => {
		appointment_type_selected = app.state;
		appointment_data.description = app.description;
		appointment_data.id = app.id;
		appointment_data.profesional_name = app.profesional.name;
		appointment_data.profesional_id = app.profesional.id;
		modal.setAttribute('open', 'true');
	};

	const formatDate = (date: Date) => {
		const originalDate = date;
		const options: Intl.DateTimeFormatOptions = {
			weekday: 'long',
			day: '2-digit',
			month: 'long',
			year: 'numeric'
		};
		const formatedDate = originalDate.toLocaleDateString('es-ES', options);
		return capitalize(formatedDate);
	};
	const formatDateTime = (date: Date) => {
		const originalDate = date;
		const hours = originalDate.getHours().toString().padStart(2, '0');
		const minutes = originalDate.getMinutes().toString().padStart(2, '0');
		return `${hours}:${minutes}`;
	};
</script>

<svelte:head>
	<title>Mis turnos - ServiYa</title>
</svelte:head>

<dialog
	id="modal"
	bind:this={modal}
>
	<article>
		<form
			method="post"
			use:enhance={() => {
				return ({ update }) => {
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
				<span
					>Realizado por:
					<a
						target="_blank"
						href={`/profile/${appointment_data?.profesional_id}`}
					>
						{appointment_data?.profesional_name}
					</a>
				</span>
			</header>
			<input
				name="appointment_id"
				value={appointment_data?.id || ''}
				hidden
			/>
			<p>{appointment_data?.description || ''}</p>
			{#if appointment_type_selected !== 'REJECTED'}
				<footer>
					<button
						class="cancel outline"
						type="submit"
						formaction="?/cancel"
						on:click={(event) => {
							if (!confirm('Esta seguro de cancelar?')) {
								event.preventDefault();
							}
						}}
					>
						Cancelar Turno
					</button>
				</footer>
			{/if}
		</form>
	</article>
</dialog>

<main class="container">
	<nav>
		<ul />
		<ul>
			<li>
				<span class="optionMenuTitle"><h2>Mis turnos</h2></span>
			</li>
		</ul>
		<ul />
	</nav>
	<article class="appointment-lists">
		<div class="not-confirmed">
			<h3>Por Confirmar</h3>
			{#each pendingAppointments as app (app.id)}
				<div>
					<div class="content">
						<h4>{formatDate(app.date)}</h4>
						<h5>{formatDateTime(app.date)}</h5>
						<button on:click={() => setUpModal(app)}
							><span>Detalles</span> <i class="mi mi-arrow-right" /></button
						>
					</div>
				</div>
			{/each}
		</div>
		<div class="confirmed">
			<h3>Aceptados</h3>
			{#each confirmedAppointments as app (app.id)}
				<div>
					<div class="content">
						<h4>{formatDate(app.date)}</h4>
						<h5>{formatDateTime(app.date)}</h5>
						<button
							class="c"
							on:click={() => setUpModal(app)}
							><span>Detalles</span> <i class="mi mi-arrow-right" /></button
						>
					</div>
				</div>
			{/each}
		</div>
		<div class="confirmed">
			<h3>Rechazados</h3>

			{#each rejectedAppointments as app (app.id)}
				<div>
					<div class="content">
						<h4>{formatDate(app.date)}</h4>
						<h5>{formatDateTime(app.date)}</h5>
						<button on:click={() => setUpModal(app)}
							><span>Detalles</span> <i class="mi mi-arrow-right" /></button
						>
					</div>
				</div>
			{/each}
		</div>
	</article>

	<details>
		<summary
			role="button"
			class="contrast outline"
			><strong>Historial</strong>
		</summary>
		<table>
			<thead>
				<tr>
					<th>Profesional</th>
					<th>Servicio</th>
					<th>Fecha</th>
					<th>Hora</th>
					<th>Estado</th>
				</tr>
			</thead>
			<tbody>
				{#each otherAppointments as app (app.id)}
					<tr>
						<td>{app.profesional.name}</td>
						<td>{app.profesional.services_id[0]}</td>
						<td>{formatDate(app.date)}</td>
						<td>{formatDateTime(app.date)}</td>
						<td>{app.state}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</details>
</main>

<style lang="scss">
	.optionMenuTitle {
		font-size: 1.5rem;
	}
	.appointment-lists {
		display: flex;
		flex-direction: row;
		width: 100%;
		.confirmed,
		.not-confirmed {
			width: 50%;
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
