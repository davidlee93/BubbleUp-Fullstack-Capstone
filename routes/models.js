'use strict'

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const bubbleUpPostSchema = mongoose.Schema({
	name: {
		firstName: String,
		lastName: String
	},
	category: {type: String, required: true},
	contentType: {type: String},
	content: {type: String},
	created: {type: Date, default: Date.now}
});

bubbleUpPostSchema.virtual('authorName').get(function() {
	return `${this.name.firstName} ${this.name.lastName}`.trim();
});

bubbleUpPostSchema.methods.serialize = function() {
	return {
		id: this._id,
		name: this.authorName,
		category: this.category,
		contentType: this.contentType,
		content: this.content,
		created: this.created
	};
};

const BubbleUpPost = mongoose.model('Post', bubbleUpPostSchema);

module.exports = {BubbleUpPost};