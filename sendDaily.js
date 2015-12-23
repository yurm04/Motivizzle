var mongoose = require('mongoose');
var config = require('./config.js');
var motiviz = require('./motiviz.js');

/*
Connect to database, send daily messages to users
and then close database connection through callback
 */
connectDb();
motiviz.sendDaily(closeConnection);

function connectDb() {
    mongoose.connect(config.dbUrl);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'DB connection error: '));
    db.once('open', function() {
        console.log('successfully connected to DB');
    });
}

/* callback to close mongodb connection */
function closeConnection() {
    mongoose.connection.close(function() {
        console.log('connection closed');
    });
}
