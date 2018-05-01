'use strict'

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const should = chai.should();

const {BubbleUpPost} = require('../routes/models');
const {closeServer, runServer, app} = require('../server.js');
const {TEST_DATABASE_URL} = require('../routes/config');

chai.use(chaiHttp);


function tearDownDB() {
	return new Promise((resolve, reject) => {
		console.warn('Deleting database');
		mongoose.connection.dropDatabase()
			.then(result => resolve(result))
			.catch(err => reject(err));
	});
}

function seedBubbleUpPostData() {
	console.info('seeding bubbleup post data');
	const seedData = [];
	for (let i = 0; i < 5; i++) {
		seedData.push({
		title: faker.name.firstName(),
		category: faker.lorem.sentence(),
		content: faker.lorem.text()
		});
	}
	return BubbleUpPost.insertMany(seedData);
}


describe('bubbleup posts API resource', function () {
	before(function () {
		return runServer(TEST_DATABASE_URL, 8081);
	});

	beforeEach(function () {
		return seedBubbleUpPostData();
	});

	afterEach(function () {
		return tearDownDB();
	});

	after(function() {
		return closeServer();
	});

	describe('GET endpoint', function () {
		it('should return all existing bubbles', function() {
			let res;
			return chai.request(app)
				.get('/bubbles/all')
				.then(_res => {
					res = _res;
					res.should.have.status(200);
					res.body.should.have.lengthOf.at.least(1);
					return BubbleUpPost.count();
				})
				.then(count => {
				 	res.body.should.have.lengthOf(count);
				});
		});

		it('should return bubbles with right fields', function () {
			let resBubble;
			return chai.request(app)
				.get('/bubbles/all')
				.then(function (res) {
					res.should.have.status(200);
					res.should.be.json;
					res.body.should.be.a('array');
					res.body.should.have.lengthOf.at.least(1);

					res.body.forEach(function (bubble) {
						bubble.should.be.a('object');
						bubble.should.include.keys('id', 'category', 'content', 'title', 'created');
					});
					resBubble = res.body[0];
					return BubbleUpPost.findById(resBubble.id);
				})
				.then(bubble => {
					resBubble.category.should.equal(bubble.category);
					resBubble.content.should.equal(bubble.content);
					resBubble.title.should.equal(bubble.title);
				});
		});
	});

	describe('POST endpoint', function () {
		it('should add a new bubbleup post', function () {
			const newBubble = {
				category: faker.lorem.sentence(),
				title: faker.name.firstName(),
				content: faker.lorem.text()
			};
			return chai.request(app)
				.post('/bubbles')
				.send(newBubble)
				.then(function (res) {
					res.should.have.status(201);
					res.should.be.json;
					res.body.should.be.a('object');
					res.body.should.include.keys(
						'id', 'category', 'content', 'title', 'created');
					res.body.category.should.equal(newBubble.category);
					res.body.id.should.not.be.null;
					res.body.title.should.equal(newBubble.title);
					res.body.content.should.equal(newBubble.content);
					return BubbleUpPost.findById(res.body.id);
				})
				.then(function (bubble) {
					bubble.category.should.equal(newBubble.category);
					bubble.content.should.equal(newBubble.content);
					bubble.title.should.equal(newBubble.title);
				});
		});

		it('should error if POST is missing expected values', function() {
			const badRequestData = {};
			return chai.request(app)
				.post('/bubbles')
				.send(badRequestData)
				.catch(function(res) {
					res.should.have.status(400);
				});
		});
	});

	describe('DELETE endpoint', function () {
		it('should delete a post by id', function() {
			let bubble;

			return BubbleUpPost
				.findOne()
				.then(_bubble => {
					bubble = _bubble;
					return chai.request(app).delete(`/bubbles/${bubble.id}`);
				})
				.then(res => {
					res.should.have.status(204);
					return BubbleUpPost.findById(bubble.id);
				})
				.then(_bubble => {
					should.not.exist(_bubble);
				});
		});
	});

	describe('PUT endpoint', function () {
		it('should update fields you send over', function () {
			const updateData = {
				category: 'cats cats cats',
				content: 'dogs dogs dogs',
				title: 'house pets'
			};

			return BubbleUpPost
				.findOne()
				.then(bubble => {
					updateData.id = bubble.id;
					return chai.request(app)
						.put(`/bubbles/${bubble.id}`)
						.send(updateData);
				})
				.then(res => {
					res.should.have.status(200);
					return BubbleUpPost.findById(updateData.id);
				})
				.then(bubble => {
					bubble.category.should.equal(updateData.category);
					bubble.content.should.equal(updateData.content);
					bubble.title.should.equal(updateData.title);
				});
		});
	});
});


