'use strict'
var format = require('date-fns/format')

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const bubbleUpPostSchema = mongoose.Schema({
	title: {type: String, require: true},
	category: {type: String, required: true},
	contentType: {type: String},
	content: {type: String, required: true},
	created: {type: Date, default: format(
									  new Date(),
									  'MM/DD/YYYY')}
});

bubbleUpPostSchema.methods.serialize = function() {
	return {
		id: this._id,
		title: this.title,
		category: this.category,
		contentType: this.contentType,
		content: this.content,
		created: this.created
	};
};

const BubbleUpPost = mongoose.model('Post', bubbleUpPostSchema);

module.exports = {BubbleUpPost};