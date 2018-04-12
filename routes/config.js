'use strict'

exports.DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL || 'mongodb://127.0.0.1:27017/bubbleup';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://127.0.0.1:27017/bubbleup-test';
exports.PORT = process.env.PORT || 8080;