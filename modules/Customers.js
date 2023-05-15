const mongoose = require('mongoose');

const { Schema } = mongoose;
var x = new Date();
const y = x.getFullYear();
const customerSchema = new Schema({
	customerName: { type: String, required: [ true, 'Please Provide a name' ] },
	customerSurname: { type: String, required: [ true, 'Please Provide a surname' ] },
	isActive: { type: Boolean, default: false, require: true },
	customerEmail: {
		type: String,
		required: true,
		unique: true,
		match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email' ]
	},
	customerSRC: { type: String, require: true },
	customerGender: { type: String, required: [ true, 'Please provide a gender' ] },
	customerAge: {
		type: Number,
		min: [ 20, 'minimum age : 20' ],
		required: [ true, 'Plesae Provide a Age' ]
	},
	customerCity: {
		type: String,
		required: true
	},
	customerInfo: { type: String, required: false },
	customerCountry: {
		type: String,
		required: true
	},
	workingPosition: { type: String, require: true },
	customerPhone: {
		type: String,
		required: true,
		match: [ /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, 'Please provide a valid phone Number' ]
	},
	customerCV: { type: String, required: true },
	workStarted: { type: Number, require: true, default: y }
});
module.exports = mongoose.model('Customer', customerSchema);
