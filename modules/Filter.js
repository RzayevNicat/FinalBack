const mongoose = require('mongoose');

const { Schema } = mongoose;
const filterSchema = new Schema({
	color: { type: Array, required: true },
	size: { type: Array, required: true }
});

module.exports = mongoose.model('Filter', filterSchema);
