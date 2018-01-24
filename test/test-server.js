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
	for (let i = 0; i < 10; i++) {
		seedData.push({
			name: {
				firstname: faker.name.firstName(),
				lastname: faker.name.lastName()
			},
		category: faker.lorem.sentence(),
		content: faker.lorem.text()
		});
	}
	return BubbleUpPost.insertMany(seedData);
}


describe('bubbleup posts API resource', function () {
	before(function () {
		return runServer(TEST_DATABASE_URL);
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
		it('should return all exisiting posts', function() {
			let res;
			return chai.request(app)
				.get('/bubbles')
				.then(_res => {
					res = _res;
					res.should.have.status(200);
					res.body.should.have.length.of.at.least(1);

					return BubbleUpPost.count();
				})
				.then(count => {
					res.body.should.have.length.of(count);
				});
		});

	// 	it('should return posts with right fields', function () {
	// 		let resPost;
	// 		return chai.request(app)
	// 			.get('/bubbles')
	// 			.then(function (res) {
	// 				res.should.have.status(200);
	// 				res.should.be.json;
	// 				res.body.should.be.a('array');
	// 				res.body.should.have.length.of.at.least(1);

	// 				res.body.forEach(function (post) {
	// 					post.should.be.a('object');
	// 					post.should.include.keys('id', 'category', 'content', 'name', 'created');
	// 				});
	// 				resPost = res.body[0];
	// 				return BubbleUpPost.findById(resPost.id);
	// 			})
	// 			.then(post => {
	// 				resPost.category.should.equal(post.category);
	// 				resPost.content.should.equal(post.content);
	// 				resPost.name.should.equal(post.authorName);
	// 			});
	// 	});
	// });

	// describe('POST endpoint', function () {
	// 	it('should add a new bubbleup post', function () {
	// 		const newPost = {
	// 			category: faker.lorem.sentence(),
	// 			name: {
	// 				firstName: faker.name.firstName(),
	// 				lastName: faker.name.lastName()
	// 			},
	// 			content: faker.lorem.text()
	// 		};
	// 		return chai.request(app)
	// 			.post('/bubbles')
	// 			.send(newPost)
	// 			.then(function (res) {
	// 				res.should.have.status(201);
	// 				res.should.be.json;
	// 				res.body.should.be.a('object');
	// 				res.body.should.include.keys(
	// 					'id', 'category', 'content', 'name', 'created');
	// 				res.body.category.should.equal(newPost.category);
	// 				res.body.id.should.not.be.null;
	// 				res.body.name.should.equal(
	// 					`${newPost.name.firstName} ${newPost.name.lastName}`);
	// 				res.body.content.should.equal(newPost.content);
	// 				return BubbleUpPost.findById(res.body.id);
	// 			})
	// 			.then(function (post) {
	// 				post.category.should.equal(newPost.category);
	// 				post.content.should.equal(newPost.content);
	// 				post.name.firstName.should.equal(newPost.name.firstName);
	// 				post.name.lastName.should.equal(newPost.name.lastName);
	// 			});
	// 	});
	// });

	// describe('PUT endpoint', function () {
	// 	it('should update fields you send over', function () {
	// 		const updateData = {
	// 			category: 'cats cats cats',
	// 			content: 'dogs dogs dogs',
	// 			name: {
	// 				firstName: 'foo',
	// 				lastName: 'bar'
	// 			}
	// 		};

	// 		return BubbleUpPost
	// 			.findOne()
	// 			.then(post => {
	// 				updateData.id = post.id;

	// 				return chai.request(app)
	// 					.put(`/bubbles/${post.id}`)
	// 					.send(updateData);
	// 			})
	// 			.then(res => {
	// 				res.should.have.status(204);
	// 				return BubbleUpPost.findById(updateData.id);
	// 			})
	// 			.then(post => {
	// 				post.category.should.equal(updateData.category);
	// 				post.content.should.equal(updateData.content);
	// 				post.name.firstName.should.equal(updateData.name.firstName);
	// 				post.name.lastName.should.equal(updateData.name.lastName);
	// 			});
	// 	});
	// });

	// describe('DELETE endpoint', function () {
	// 	it('should delete a post by id', function() {
	// 		let post;

	// 		return BubbleUpPost
	// 			.findOne()
	// 			.then(_post => {
	// 				post = _post;
	// 				return chai.request(app).delete(`/bubbles/${post.id}`);
	// 			})
	// 			.then(res => {
	// 				res.should.have.status(204);
	// 				return BubbleUpPost.findById(post.id);
	// 			})
	// 			.then(_post => {
	// 				should.not.exist(_post);
	// 			});
	// 	});
	// });
});


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

