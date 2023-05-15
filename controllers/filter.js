const CustomError = require('../helpers/errors/CustomError');
const AsyncErrorHandler = require('express-async-handler');
const Filter = require('../modules/Filter');
const postFilter = AsyncErrorHandler(async (req, res, next) => {
	const { color, size } = req.body;

	console.log(req.body);
	const filter = await Filter.create({
		color,
		size
	});

	res.status(200).json({
		success: true,
		data: filter
	});
});
const getFilter = AsyncErrorHandler(async (req, res, next) => {
	Filter.find({}, (err, docs) => {
		res.status(200).json({
			success: true,
			data: docs
		});
	});
});
const deleteFilter = AsyncErrorHandler(async (req, res, next) => {
	const { id } = req.params;
	Filter.findByIdAndDelete(id, (err) => {
		if (!err) {
			res.status(200).json({
				success: true
			});
		}
	});
});
const errorTest = (req, res, next) => {
	return next(new CustomError('Custom Error Error'));
};

module.exports = {
	postFilter,
	getFilter,
	errorTest,
	deleteFilter
};
