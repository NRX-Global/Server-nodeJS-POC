var mongoose = require('mongoose');
var config = require( './config');

mongoose.connect( config.db.uri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log('db connection open');
});

module.exports = db;