import Handlebars from "handlebars";
import { sendEmail } from "./setupSmtp";
import { BASE_URL } from "$env/static/private";

export async function notifyTurnSolicitation(opts: { to: string, date: Date, clientName: string }) {
	const { to, date, clientName } = opts
	const html = await import('./notifyTurnSolicitation.html?raw').then(x => x.default)
	const templeate = Handlebars.compile(html)
	await sendEmail({
		from: { name: "ServiYa", address: "serviya@ttaddss.com" },
		to,
		subject: "Te han solicitado un turno",
		html: templeate({ date: date.toLocaleDateString(), clientName, base_url: BASE_URL })
	})

}

export async function notifyResetPasswordLink(opts: { to: string, clientName: string, token: any }) {
	const { to, clientName, token } = opts;
	const html = await import('./notifyResetPasswordLink.html?raw').then(x => x.default)
	const templeate = Handlebars.compile(html)
	await sendEmail({
		from: { name: "ServiYa", address: "serviya@ttaddss.com" },
		to,
		subject: "Reestablecer contraseña",
		html: templeate({ clientName, base_url: BASE_URL, token })
	})
}

export async function notifyTurnAceptation(opts: { to: string, profesionalName: string, date: Date }) {
	const { to, profesionalName, date } = opts;
	const html = await import('./notifyTurnConfirmation.html?raw').then(x => x.default)
	const templeate = Handlebars.compile(html)
	await sendEmail({
		from: { name: "ServiYa", address: "serviya@ttaddss.com" },
		to,
		subject: "Confirmacion de turno",
		html: templeate({ date: date.toLocaleDateString(), profesionalName })
	})
}
