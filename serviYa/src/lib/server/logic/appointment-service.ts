import { notifyTurnAceptation } from '../email/emailService';
import { user_repo, type IUserRepo } from './user-repo';
import { appointment_repo, type IAppointmentRepo } from './appointent-repo';

function logic_error(msj: string) {
	return { msj, type: 'LOGIC_ERROR' } as const;
}
function auth_error(msj: string) {
	return { msj, type: 'AUTH_ERROR' } as const;
}

function is_ok() {
	return { type: 'OK' } as const;
}

export class AppointmentService {
	constructor(private appointment_repo: IAppointmentRepo, private user_repo: IUserRepo) {}

	async acceptTurn({
		appointment_id,
		user
	}: {
		appointment_id: string;
		user: { userId: string; name: string };
	}) {
		if (!appointment_id) {
			return logic_error('No se envio el id del turno');
		}

		const appointment = await this.appointment_repo.getbyId(appointment_id);
		if (!appointment) {
			return logic_error('Appointment not found');
		}
		if (appointment.profesional_id != user?.userId) {
			return auth_error('You lack the required credentilas');
		}
		if (appointment.state != 'UNCONFIRMED') {
			return logic_error('Appointment is not UNCONFIRMED');
		}

		await this.appointment_repo.setState({ appointment_id, state: 'TO_DO' });

		const { client_id, date } = appointment;

		const client = await this.user_repo.getbyId(client_id);
		if (!client) return logic_error('client not found');

		notifyTurnAceptation({ to: client.email, date, profesionalName: user.name }) //async
			.catch(() => console.log('Error sending email: '));
		return is_ok();
	}
}

export const appointment_service = new AppointmentService(appointment_repo, user_repo);
