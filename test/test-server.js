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

describe('about page', function() {

	it('should return about.ejs', function() {
		return chai.request(app)
			.get('/about')
			.then(function (res) {
				res.should.have.status(200);
		});
	});
});

