// sendLyric.js =======================

var mongoose = require('mongoose');

var DB_URL  = process.env.DB_URL;
var motiviz = require('../modules/motiviz.js');

/*
Connect to database, send daily messages to users
and then close database connection through callback
 */
connectDb(sendAll);

function sendAll() {
    motiviz.sendDaily(closeConnection);
}

function connectDb(cb) {
    mongoose.connect(DB_URL);
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
