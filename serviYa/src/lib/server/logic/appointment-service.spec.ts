import { beforeAll, describe, expect, test, vi } from 'vitest';
import { AppointmentService } from './appointment-service';
import type { IUserRepo } from './user-repo';
import type { IAppointmentRepo } from './appointent-repo';
import { set } from 'zod';
import type { Appointment } from '@prisma/client';

const user_repo_mock = {
	getbyId: vi.fn()
} satisfies IUserRepo;

const appointment__repo_mock = {
	getbyId: vi.fn(),
	setState: vi.fn()
} satisfies IAppointmentRepo;

const service = new AppointmentService(appointment__repo_mock, user_repo_mock);

describe('appointment service', () => {
	test('appointment don not exist', async () => {
		const null_promise = async () => null;
		appointment__repo_mock.getbyId.mockReturnValue(null_promise());
		const res = await service.acceptTurn({
			appointment_id: '32',
			user: { userId: '1', name: 'Lucas' }
		});
		expect(res).toEqual({
			msj: 'Appointment not found',
			type: 'LOGIC_ERROR'
		});
	});

	test('appointment does not belong to user', async () => {
		const appointment_promise = async () =>
			({
				id: '1',
				profesional_id: '10',
				date: new Date(),
				description: '',
				state: 'UNCONFIRMED',
				client_id: '50'
			} satisfies Appointment);
		appointment__repo_mock.getbyId.mockReturnValue(appointment_promise());
		const res = await service.acceptTurn({
			appointment_id: '32',
			user: { userId: 'xx', name: 'Lucas' }
		});
		expect(res).toEqual({
			msj: 'You lack the required credentilas',
			type: 'AUTH_ERROR'
		});
	});

	test('appointment does is not UNCONFIRMED', async () => {
		const appointment_promise = async () =>
			({
				id: '1',
				profesional_id: '10',
				date: new Date(),
				description: '',
				state: 'DONE',
				client_id: '50'
			} satisfies Appointment);
		appointment__repo_mock.getbyId.mockReturnValue(appointment_promise());
		const res = await service.acceptTurn({
			appointment_id: '32',
			user: { userId: '10', name: 'Lucas' }
		});
		expect(res).toEqual({
			msj: 'Appointment is not UNCONFIRMED',
			type: 'LOGIC_ERROR'
		});
	});
});
