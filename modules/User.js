const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new Schema({
	name: { type: String, required: [ true, 'Please Provide a name' ] },
	surname: { type: String, required: [ true, 'Please Provide a name' ] },
	email: {
		type: String,
		required: true,
		unique: true,
		match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email' ]
	},
	gender: { type: String, required: [ true, 'Please provide a gender' ] },
	password: {
		type: String,
		minlength: [ 6, 'minimum length : 6' ],
		required: [ true, 'Plesae Provide a password' ],
		select: true
	},
	role: { type: String, require: true, default: 'user' },
	options: { type: Boolean, required: true },
	src: {
		type: String,
		required: false,
		default: 'https://logodix.com/logo/1070509.png'
	},
	country: { type: String, required: false },
	mmyy: {
		type: String,
		required: false,
		match: [ /^(1[0-2]|0[1-9]|\d)\/(20\d{2}|19\d{2}|0(?!0)\d|[1-9]\d)$/, 'Invalid Date' ]
	},
	cvv: { type: Number, required: false, match: [ /^[0-9]{3,4}$/, 'Invalid CVV' ] },
	postalCode: {
		type: String,
		required: false,
		match: [ /(^\d{5}$)|(^\d{5}-\d{4}$)/, 'Please provide a valid postal code' ]
	},
	cardNumber: {
		type: Number,
		required: false,
		match: [ /^([0-9]{4}[- ]?){3}[0-9]{4}$/, 'Please provide a valid card number' ]
	},
	phoneNumber: {
		type: String,
		required: false,
		match: [ /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, 'Please provide a valid phone Number' ]
	},
	userCheckOut: { type: Array, required: false },
	userWishlist: { type: Array, required: false },
	userCard: { type: Array, required: false },
	resetPasswordToken: {
		type: String
	},
	resetPasswordExpire: {
		type: Date
	},
	subscribe: {
		type: Boolean,
		require: true,
		default: false
	}
});
userSchema.methods.getResetPasswordTokenFromUser = function() {
	const randomHexString = crypto.randomBytes(15).toString('hex');
	const { RESET_PASSWORD_EXPIRE } = process.env;
	const resetPasswordToken = crypto.createHash('SHA256').update(randomHexString).digest('hex');

	this.resetPasswordToken = resetPasswordToken;
	this.resetPasswordExpire = Date.now() + parseInt(RESET_PASSWORD_EXPIRE);
	return resetPasswordToken;
};
userSchema.methods.generateJwtFromUser = function() {
	const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env;
	const payload = {
		id: this._id,
		name: this.name,
		email: this.email,
		password: this.password,
		role: this.role
	};
	const token = jwt.sign(payload, JWT_SECRET_KEY, {
		expiresIn: JWT_EXPIRE
	});
	return token;
};
userSchema.pre('save', function(next) {
	if (!this.isModified('password')) {
		next();
	}
	bcrypt.genSalt(10, (err, salt) => {
		if (err) next(err);
		bcrypt.hash(this.password, salt, (err, hash) => {
			if (err) next(err);
			this.password = hash;
			next();
		});
	});
	next();
});
module.exports = mongoose.model('User', userSchema);
