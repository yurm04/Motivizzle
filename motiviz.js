// movitiz.js =========================

var User   = require('./src/models/User.js');
var Lyric  = require('./src/models/Lyric.js');
var config = require('./config.js');

var twilio = require('twilio')(config.twilioSID, config.twilioToken);

function getRandom(length) {
    return Math.floor(Math.random() * length);
}

function getLyric() {
    var today;
    Lyric.find({ sent: { $exists: false }}, function(err, lyrics) {
        today = lyrics[getRandom(lyrics.length)];
    });
}

var sendMessage = function(user, lyric) {
    var today = lyric.quote + " - " + lyric.artist + " (motiviz.js)";
    var messageData = {
        to: user.phone,
        from: config.twilioFrom,
        body: today
    };

    twilio.sendMessage(messageData, function(err, responseData) {
        if (err) {
            console.log('twilio error', err);
            return;
        }
        if (responseData) {
            console.log('twilio response', responseData);
        };
    });
    // console.log(messageData);
    return;
};

module.exports.addLyric = function(lyric, artist, cb) {
    if (!lyric || !artist) {
        console.log('missing required data');
    }

    var newLyric = Lyric();

    newLyric.quote = lyric;
    newLyric.artist = artist;

    newLyric.save(function(err) {
        if (err) {
            console.log('An error occurred', err);
        }
        cb();
    });
};

module.exports.sendDaily = function(cb) {
    User.find({ active : 1 }, function(err, found) {

        if (err) {
            console.log('Could not send daily text', Date().toString(), err);
            return cb();
        }

        if (!found || found.length === 0 ) {
            console.log('No users found');
            return cb();
        }

        // get random quote
        Lyric.find({ sent: { $exists: false }}, function(err, lyrics) {
            if (err) {
                console.log('Could not get lyric', err);
                return false;
            }
            if (lyrics.length === 0) {
                console.log('No lyrics found');
                return false;
            }

            var today = lyrics[getRandom(lyrics.length)];

            // iterate through each number
            found.forEach(function(user) {
                sendMessage(user, today);
            });
            today.sent = Date();
            today.save(function(err) {
                if (err) {
                    console.log('could not update lyric sent date', err);
                    cb();
                }
                cb();
            });
        });

    });
};

module.exports.sendWelcome = function() {

};