const express = require('express');
const dotenv = require('dotenv');
const routers = require('./routers/index');
const mongoose = require('mongoose');
const customError = require('./middlewares/errors/customErros');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());

app.use(cors());
dotenv.config({
	path: './config/env/config.env'
});

app.get('/', (req, res) => {
	res.send('<h1>My Data</h1>');
});
app.use('/', routers);
app.use(customError);

PORT = process.env.PORT;
CONNECT_URL = process.env.CONNECT_URL;
mongoose.set('strictQuery', false);
mongoose.connect(CONNECT_URL, (err) => {
	if (!err) {
		app.listen(PORT || 3000, () => {
			console.log('Data Listening');
		});
	} else {
		console.log(err);
	}
});
