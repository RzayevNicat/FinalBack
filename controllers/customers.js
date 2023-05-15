const CustomError = require('../helpers/errors/CustomError');
const AsyncErrorHandler = require('express-async-handler');
const Customers = require('../modules/Customers');
const postCustomer = AsyncErrorHandler(async (req, res, next) => {
	const {
		customerName,
		customerSRC,
		customerSurname,
		customerEmail,
		customerAge,
		customerPhone,
		isActive,
		customerCity,
		customerCountry,
		customerInfo,
		workingPosition,
		customerGender,
		customerCV,
		workStarted
	} = req.body;

	const customer = await Customers.create({
		customerName,
		customerSurname,
		customerEmail,
		customerAge,
		customerPhone,
		customerCity,
		customerCountry,
		customerInfo,
		workingPosition,
		customerGender,
		customerCV,
		isActive,
		customerSRC,
		workStarted
	});

	res.status(200).json({
		success: true,
		data: customer
	});
});
const getCustomers = AsyncErrorHandler(async (req, res, next) => {
	Customers.find({}, (err, docs) => {
		res.status(200).json({
			success: true,
			data: docs
		});
	});
});
const getById = AsyncErrorHandler(async (req, res, next) => {
	const { id } = req.params;
	Customers.findById(id, (err, doc) => {
		if (!err) {
			if (doc) {
				res.status(200).json({
					success: true,
					data: doc
				});
			} else {
				res.status(404).json({
					success: false
				});
			}
		}
	});
});
const updateCustomer = AsyncErrorHandler(async (req, res, next) => {
	const { id } = req.params;

	Customers.findByIdAndUpdate(id, req.body, (err, doc) => {
		if (!err) {
			res.status(200).json({
				success: true,
				data: doc
			});
		}
	});
});
const deleteCustomer = AsyncErrorHandler(async (req, res, next) => {
	const { id } = req.params;
	Customers.findByIdAndDelete(id, (err) => {
		res.status(200).json({
			success: true,
			message: 'Delete Customer'
		});
	});
});
module.exports = {
	postCustomer,
	deleteCustomer,
	updateCustomer,
	getById,
	getCustomers
};
