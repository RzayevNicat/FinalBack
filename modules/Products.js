const mongoose = require('mongoose');

const { Schema } = mongoose;

const productShecma = new Schema({
	productName: { type: String, required: true },
	prodcutPrice: { type: Number, required: true },
	productStock: { type: Number, required: true },
	img_url: { type: String, required: true },
	discontinued: { type: Boolean, required: true },
	productRatings: { type: Number, required: true },
	sale: { type: Boolean, required: true },
	brand: { type: String, required: true },
	type: { type: String, required: true },
	gender: { type: String, required: false },
	productReview: { type: Array, required: false },
	productInfo: { type: String, required: true },
	productSize: { type: Array, required: false },
	productColor: { type: Array, required: true },
	productImages: { type: Array, required: false }
});
module.exports = mongoose.model('Products', productShecma);
