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
    motiviz.addLyric("We can’t change the world until we change ourselves.", 'Biggie Smalls', closeConnection);
    motiviz.addLyric("You have to keep your vision clear, cause only a coward lives in fear.", 'Nas', closeConnection);   
    motiviz.addLyric("Living life is a choice. Making a difference in someone else’s isn’t", 'Kid Cudi', closeConnection);
    motiviz.addLyric("Damn right I like the life I live, cause I went from negative to positive.", 'Biggie Smalls', closeConnection);
    motiviz.addLyric("Life is a crazy ride and nothing is guaranteed.", 'Eminem', closeConnection);   
    motiviz.addLyric("Living well eliminates the need for revenge.", 'Kanye West', closeConnection);
    motiviz.addLyric("If you’re scared to take chances, you’ll never have the answers.", 'Nas', closeConnection);
    motiviz.addLyric("Forget yesterday, live for today. Tomorrow will take care of itself.", 'Rick Ross', closeConnection);
    motiviz.addLyric("We can't change the world until we change ourselves", 'Biggie Smalls', closeConnection);
    motiviz.addLyric("If you admire someone, you should go ahead and tell them. People never get the flowers while they can still smell them.", 'Kanye West', closeConnection);
    motiviz.addLyric("No matter where life takes me. Find me with a smile.", 'Mac Miller', closeConnection);
    motiviz.addLyric("When people treat you like nothing, you begin to feel like nothing.", 'Drake', closeConnection);
    motiviz.addLyric("You can make something of your life, it just depends on your drive.", 'Eminem', closeConnection);
    motiviz.addLyric("Never apologize for what you feel. It’s like apologizing for being real.", 'Lil Wayne', closeConnection);
    motiviz.addLyric("Regardless of how it goes down, life goes on.", 'Rick Ross', closeConnection);
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
