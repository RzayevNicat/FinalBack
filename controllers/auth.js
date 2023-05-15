const User = require('../modules/User');
const CustomError = require('../helpers/errors/CustomError');
const { sendJwtToClient } = require('../helpers/authh/tokenHelpers');
const { validateInputs, comparePassword } = require('../helpers/authh/inputHelpers');
const AsyncErrorHandler = require('express-async-handler');
const sendEmail = require('../helpers/libraries/sendEmail');
const postUser = AsyncErrorHandler(async (req, res, next) => {
	const {
		name,
		email,
		password,
		surname,
		src,
		options,
		gender,
		role,
		userCheckOut,
		userWishlist,
		userCard,
		country,
		mmyy,
		cvv,
		postalCode,
		cardNumber,
		phoneNumber,
		subscribe
	} = req.body;
	const user = await User.create({
		name,
		surname,
		email,
		src,
		password,
		gender,
		role,
		options,
		userCheckOut,
		userWishlist,
		userCard,
		country,
		mmyy,
		cvv,
		postalCode,
		cardNumber,
		phoneNumber,
		subscribe
	});
	sendJwtToClient(user, res);
});
const login = AsyncErrorHandler(async (req, res, next) => {
	const { email, password } = req.body;
	if (!validateInputs(email, password)) {
		return next(new CustomError('Please check your input', 400));
	}
	const user = await User.findOne({ email }).select('+password');
	if (password !== user.password) {
		return next(new CustomError('Plesae check your Password'));
	}
	sendJwtToClient(user, res);
});
const logout = AsyncErrorHandler(async (req, res, next) => {
	const { NODE_ENV } = process.env;

	return res
		.status(200)
		.cookie({
			httpOnly: true,
			expires: new Date(Date.now()),
			secure: NODE_ENV === 'development' ? false : true
		})
		.json({
			success: true,
			message: 'Logout'
		});
});
const forgatPassword = AsyncErrorHandler(async (req, res, next) => {
	const resetEmail = req.body.email;

	const user = await User.findOne({ email: resetEmail });
	if (!user) {
		return next(new CustomError('User Not Found', 400));
	}
	const resetPasswordToken = user.getResetPasswordTokenFromUser();
	await user.save();

	const resetPassvordURL = `https://final-o3m3.vercel.app/resetPassword/${resetPasswordToken}`;

	const emailTemplate = `
		<h3>Reset Your Password</h3>
		<p>This <a href='${resetPassvordURL}' target='_blank'>Reset Password</a> Will expire in 1 hour</p>
	`;
	try {
		await sendEmail({
			from: process.env.SHTP_USER,
			to: resetEmail,
			subject: 'Reset Your Password',
			html: emailTemplate
		});
		res.status(200).json({
			success: true,
			message: 'Token send your email'
		});
	} catch (err) {
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;

		await user.save();

		return next(new CustomError('Email Couldnt be send', 500));
	}
});
const resetPassword = AsyncErrorHandler(async (req, res, next) => {
	const { resetPasswordToken } = req.query;
	const { password } = req.body;
	if (!resetPasswordToken) {
		return next(new CustomError('Please provide a valid token', 400));
	}
	let user = await User.findOne({
		resetPasswordToken: resetPasswordToken,
		resetPasswordExpire: { $gt: Date.now() }
	});
	if (!user) {
		return next(new CustomError('Invalid Token or Session expired', 404));
	}

	user.password = password;

	user.resetPasswordToken = undefined;
	user.resetPasswordExpire = undefined;

	await user.save();

	return res.status(200).json({
		success: true,
		message: 'Reset Password process succesfull'
	});
});

const getUserr = (req, res, next) => {
	res.json({
		success: true,
		data: {
			id: req.user.id,
			name: req.user.name,
			email: req.user.email,
			password: req.user.password
		}
	});
};
module.exports = {
	postUser,

	logout,

	forgatPassword,
	resetPassword,
	login,
	getUserr
};
