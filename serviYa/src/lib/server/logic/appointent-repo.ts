import type { AppointmentState } from '@prisma/client';
import { prisma } from '../lucia/prisma';

type Appointment = {
	id: string;
	profesional_id: string;
	client_id: string;
	date: Date;
	description: string;
	state: AppointmentState;
};

export interface IAppointmentRepo {
	getbyId(id: string): Promise<Appointment | null>;
	setState(data: { appointment_id: string; state: AppointmentState }): Promise<void>;
}

export class AppointmentRepo implements IAppointmentRepo {
	getbyId(id: string) {
		return prisma.appointment.findFirst({ where: { id } });
	}
	async setState(data: { appointment_id: string; state: AppointmentState }) {
		const { appointment_id, state } = data;
		await prisma.appointment.update({
			where: { id: appointment_id },
			data: { state }
		});
	}
}

export const appointment_repo = new AppointmentRepo();
