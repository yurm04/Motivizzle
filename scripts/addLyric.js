// addLyric.js ========================

var mongoose = require('mongoose');

var config = require('../config.js');
var motiviz = require('../modules/motiviz.js');

/*
Connect to database, send daily messages to users
and then close database connection through callback
 */
connectDb(addLyrics);

function addLyrics() {
    motiviz.addLyric("You've got enemies?  Good, that means you actually stood up for something", 'Eminem', closeConnection);
    motiviz.addLyric("Stop lookin' at what you ain't got and start being thankful for what you do got", 'T.I', closeConnection);
    motiviz.addLyric("Some of y'all are not where you want to be in life.  Yet you party every weekend. What exactly are you celebrating?", 'T.I', closeConnection);
    motiviz.addLyric("We can't change the world until we change ourselves", 'Biggie Smalls', closeConnection);
}

function connectDb(cb) {
    mongoose.connect(config.dbUrl);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'DB connection error: '));
    db.once('open', function() {
        console.log('successfully connected to DB');
        return cb();
    });
}

/* callback to close mongodb connection */
function closeConnection() {
    mongoose.connection.close(function() {
        console.log('connection closed');
    });
}
