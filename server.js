'use strict'

const express = require('express');

const app = express();

app.use(express.static('public'));

// app.set('view engine', 'ejs');

// app.get('/posts', function(req, res) {
//     res.render('views/about');
// });

if (require.main === module) {
	app.listen(process.env.PORT || 8080, function () {
		console.info(`App listening on ${this.address().port}`);
	});
}


module.exports = app;