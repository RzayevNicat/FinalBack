const bcrypt = require('bcryptjs');
const validateInputs = (email, password) => {
	return email && password;
};
const comparePassword = (password, hashedPassword) => {
	return bcrypt.compareSync(password, hashedPassword);
};
module.exports = { validateInputs, comparePassword };
