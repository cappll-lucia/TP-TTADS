import nodemailer from "nodemailer";
import { GOOGLE_EMAIL, GOOGLE_EMAIL_PASSWORD } from "$env/static/private";
import type Mail from "nodemailer/lib/mailer";
const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		user: GOOGLE_EMAIL,
		pass: GOOGLE_EMAIL_PASSWORD,
	},
});

transporter.verify(function(error) {
	if (error) {
		console.error(error);
	} else {
		console.log("Server is ready to take our messages");
	}
});

export function sendEmail(x: Mail.Options) {
	// this wrapping might seem ugly, but is needed to deploy in Vercel
	return new Promise((resolve, reject) => {
		return transporter.sendMail(x, (err, info) => {
			if (err) {
				console.error(err);
				reject(err);
			} else {
				console.log(info);
				resolve(info);
			}
		});
	});
}
