'use strict'

exports.DATABASE_URL = proccess.env.DATABASE_URL || global.DATABASE_URL || 'mongodb://localhost:27017/bubbleup-app';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost:27017';
exports.PORT = process.env.PORT || 8080;