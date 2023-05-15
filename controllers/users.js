const User = require('../modules/User');
const CustomError = require('../helpers/errors/CustomError');
const AsyncErrorHandler = require('express-async-handler');
const getAllUser = AsyncErrorHandler(async (req, res, next) => {
	User.find({}, (err, docs) => {
		if (!err) {
			res.status(200).json({
				success: true,
				data: docs
			});
		}
	});
});
const getUser = AsyncErrorHandler(async (req, res, next) => {
	const { id } = req.params;
	User.findById(id, (err, doc) => {
		if (!err) {
			if (doc) {
				res.status(200).json({
					success: true,
					data: doc
				});
			} else {
				res.status(404).json({
					success: false,
					message: 'User Not found'
				});
			}
		}
	});
});
const deleteUser = AsyncErrorHandler(async (req, res, next) => {
	const { id } = req.params;
	User.findByIdAndDelete(id, (err) => {
		res.status(200).json({
			success: true,
			message: 'Delete Product'
		});
	});
});
const updateUser = AsyncErrorHandler(async (req, res, next) => {
	const { id } = req.params;
	User.findByIdAndUpdate(id, req.body, (err, doc) => {
		if (!err) {
			res.status(200).json({
				success: true,
				data: doc
			});
		} else {
			return next(new CustomError('Plesae check your Password'));
		}
	});
});

module.exports = {
	getAllUser,
	getUser,
	updateUser,
	deleteUser
};
