'use strict'

const express = require('express');

const app = express();

const routes = require('./routes/index.js');

app.use('/public', express.static(process.cwd() + '/public'));
app.set('view engine', 'ejs');


routes(app);


if (require.main === module) {
	app.listen(process.env.PORT || 8080, function () {
		console.info(`App listening on ${this.address().port}`);
	});
}


module.exports = app;