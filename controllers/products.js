const CustomError = require('../helpers/errors/CustomError');
const AsyncErrorHandler = require('express-async-handler');
const Products = require('../modules/Products');
const postProduct = AsyncErrorHandler(async (req, res, next) => {
	const {
		productName,
		prodcutPrice,
		productStock,
		img_url,
		sale,
		brand,
		productInfo,
		productSize,
		productColor,
		type,
		gender,
		productImages,
		productReview
	} = req.body;

	const product = await Products.create({
		productName,
		prodcutPrice,
		productStock,
		img_url,
		discontinued: productStock === 0 ? false : true,
		productRatings,
		sale,
		brand,
		productInfo,
		productSize,
		productColor,
		type,
		gender,
		productImages,
		productReview
	});

	res.status(200).json({
		success: true,
		data: product
	});
});
const getProducts = AsyncErrorHandler(async (req, res, next) => {
	Products.find({}, (err, docs) => {
		res.status(200).json({
			success: true,
			data: docs
		});
	});
});
const getById = AsyncErrorHandler(async (req, res, next) => {
	const { id } = req.params;
	Products.findById(id, (err, doc) => {
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
const updateProducts = AsyncErrorHandler(async (req, res, next) => {
	const { id } = req.params;

	Products.findByIdAndUpdate(id, req.body, (err, doc) => {
		if (!err) {
			res.status(200).json({
				success: true,
				data: doc
			});
		}
	});
});
const deleteProduct = AsyncErrorHandler(async (req, res, next) => {
	const { id } = req.params;
	Products.findByIdAndDelete(id, (err) => {
		res.status(200).json({
			success: true,
			message: 'Delete Product'
		});
	});
});
const errorTest = (req, res, next) => {
	return next(new CustomError('Custom Error Error'));
};
module.exports = {
	postProduct,
	errorTest,
	getProducts,
	deleteProduct,
	updateProducts,
	getById
};
