// addLyric.js ========================

var mongoose = require('mongoose');

var MONGOLAB_URI  = process.env.MONGOLAB_URI;
var motiviz = require('../modules/motiviz.js');

/*
Connect to database, send daily messages to users
and then close database connection through callback
 */
connectDb(addLyrics);

function addLyrics() {
    motiviz.addLyric("I got a million ways to get it. Choose one.", 'Jay Z', closeConnection);
    motiviz.addLyric("I'm like Che Guevara with bling on, I'm complex, never claimed to have wings on", 'Jay Z', closeConnection);
    motiviz.addLyric("Man, you was who you was 'fore you got here", 'Jay Z', closeConnection);
    motiviz.addLyric("Swear to everything, when I leave this Earth, it’s gon’ be on both feet, never knees in the dirt", 'Jay Z', closeConnection);
    motiviz.addLyric("Everybody can tell you how they do it, they never did.", 'Jay Z', closeConnection);
    motiviz.addLyric("It drops deep as it does in my breath. I never sleep, cause sleep is the cousin of death. Beyond the walls of intelligence, life is defined.", 'Nas', closeConnection);
    motiviz.addLyric("Man, you was who you was 'fore you got here", 'Jay Z', closeConnection);

}

function connectDb(cb) {
    mongoose.connect(MONGOLAB_URI);
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
