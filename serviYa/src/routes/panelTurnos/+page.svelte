<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import { capitalize } from '$lib/utils';
	export let data: PageData;

	$: pendingAppointments = data.pendingAppointments;
	// $: otherAppointments = data.otherAppointments;
	$: confirmedAppointments = data.confirmedAppointments;
	$: appointmentTableData = confirmedAppointments;

	let modal: HTMLElement;
	let appointment_data = { id: '', description: '' };
	let appointmentTableButtons: HTMLUListElement;
	let appointmentTableOption = 'Accepted';

	const closeModal = () => {
		modal.attributes.removeNamedItem('open');
		appointment_data.description = '';
	};

	const setUpModal = (app: { id: string; description: string }) => {
		appointment_data.description = app.description;
		appointment_data.id = app.id;
		modal.setAttribute('open', 'true');
	};

	//estuve tocando el tipo de date para que no me de error, pero no se si esta bien
	const formatDate = (date: Date) => {
		console.log('date inside formatDate:', date);
		const originalDate = date;
		const options: Intl.DateTimeFormatOptions = {
			weekday: 'long',
			day: '2-digit',
			month: 'long'
		};
		const formatedDate = originalDate.toLocaleDateString('es-ES', options);
		return capitalize(formatedDate);
	};
	const formatDateTime = (date: Date) => {
		console.log('date inside formatDateTime:', date);
		const originalDate = date;
		const hours = originalDate.getHours().toString().padStart(2, '0');
		const minutes = originalDate.getMinutes().toString().padStart(2, '0');
		return `${hours}:${minutes}`;
	};

	const changeAppointmentTableType = (event: Event) => {
		appointmentTableData =
			(event.target as HTMLButtonElement).value === 'Pending'
				? pendingAppointments
				: confirmedAppointments;
		appointmentTableOption = (event.target as HTMLButtonElement).value;
		const target = event.target as HTMLButtonElement;
		const buttons = appointmentTableButtons.querySelectorAll('button');
		buttons.forEach((button) => {
			button.classList.add('outline');
		});
		target.classList.remove('outline');
	};
</script>

<dialog
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
				{#if appointmentTableOption === 'Pending'}
					<button
						type="submit"
						class="accept"
						formaction="?/confirm"
					>
						Aceptar
					</button>
				{/if}
			</footer>
		</form>
	</article>
</dialog>

<main class="container">
	<!-- TODO hay que chequear que el valor de length que se muestra se actualice bien cuando se acepte un turno-->
	<nav>
		<ul />
		<ul bind:this={appointmentTableButtons}>
			<li>
				<span class="optionMenuTitle"><strong>Turnos:</strong></span>
			</li>
			<li>
				<button
					on:click={changeAppointmentTableType}
					value="Accepted"
				>
					{#if appointmentTableOption != 'Accepted' && confirmedAppointments.length > 0}
						<span>[{confirmedAppointments.length}] </span>
					{/if}
					Aceptados</button
				>
			</li>
			<li>
				<button
					on:click={changeAppointmentTableType}
					class="outline"
					value="Pending"
				>
					{#if appointmentTableOption != 'Pending' && pendingAppointments.length > 0}
						<span>[{pendingAppointments.length}]</span>
					{/if}
					Por Confirmar</button
				>
			</li>
		</ul>
		<ul />
	</nav>
	<div class="container-fluid">
		<article>
			<table role="grid">
				<thead><th> Servicio </th><th>Fecha</th><th>Hora</th><th>Direccion</th><th /></thead>
				<tbody>
					{#each appointmentTableData as app}
						<tr>
							<td>"Servicio goes here?"</td>
							<td>{formatDate(app.date)}</td>
							<td>{formatDateTime(app.date)}</td>
							<td>{'Placeholder Location 123'}</td>
							<td>
								<button on:click={() => setUpModal(app)}
									><span>Detalles</span> <i class="mi mi-arrow-right" /></button
								>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</article>
	</div>
</main>

<style lang="scss">
	.optionMenuTitle {
		font-size: 1.5rem;
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
</style>
