var mongoose = require('mongoose');

// Telling mongoose to add promise library
mongoose.Promise - global.Promise; 
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};