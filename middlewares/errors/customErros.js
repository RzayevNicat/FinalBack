const CustomError = require('../../helpers/errors/CustomError');

const customError = (err, req, res, next) => {
	let customError = err;
	if (err.name === 'SyntaxError') {
		customError = new CustomError('Unexpected Syntax', 400);
	}
	if (err.code === 11000) {
		customError = new CustomError('Email all ready Please try another email');
	}
	console.log(CustomError.name, CustomError.message, CustomError.status);
	res.status(customError.status || 500).json({
		success: false,
		message: customError.message
	});
};
module.exports = customError;
