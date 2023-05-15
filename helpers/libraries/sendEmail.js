const nodemailer = require('nodemailer');

const sendEmail = async (mailOptions) => {
	let transporter = nodemailer.createTransport({
		host: process.env.SHTP_HOST,
		port: process.env.SHTP_PORT,
		auth: {
			user: process.env.SHTP_USER,
			pass: process.env.SHTP_PASS
		}
	});

	let info = await transporter.sendMail(mailOptions);
	console.log(`Message Sent ${info.messageId}`);
};
module.exports = sendEmail;
