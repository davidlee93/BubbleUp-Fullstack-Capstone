'use strict'

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server.js');

const should = chai.should();
chai.use(chaiHttp);

describe('index page', function() {

	it('should return index.ejs', function() {
		return chai.request(app)
			.get('/')
			.then(function (res) {
				res.should.have.status(200);
		});
	});
});

describe('bubbles page', function() {

	it('should return bubbles.ejs', function() {
		return chai.request(app)
			.get('/bubbles')
			.then(function (res) {
				res.should.have.status(200);
		});
	});
});

