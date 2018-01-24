'use strict'

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const bubbleUpPostSchema = mongoose.Schema({
	name: {
		firstName: String,
		lastName: String
	},
	category: {type: String, required: true},
	content: {type: String},
	created: {type: Date, default: Date.now}
});

bubbleUpPostSchema.virtual('authorName').get(function() {
	return `${this.author.firstName} ${this.author.lastName}`.trim();
});

bubbleUpPostSchema.methods.serialize = function() {
	return {
		id: this._id;
		author: this.authorName,
		category: this.category,
		content: this.content,
		created: this.created
	};
};

const BubbleUpPost = mongoose.model('BubbleUpPost', bubbleUpPostSchema);

module.exports = {BubbleUpPost};