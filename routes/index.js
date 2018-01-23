'use strict'

module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('pages/index');
    });

    app.get('/bubbles', function(req, res) {
        res.render('pages/bubbles');
    });
};