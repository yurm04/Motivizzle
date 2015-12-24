// movitiz.js =========================

var User   = require('../src/models/User.js');
var Lyric  = require('../src/models/Lyric.js');
var config = require('../config.js');

var twilio = require('twilio')(config.twilioSID, config.twilioToken);

function getRandom(length) {
    return Math.floor(Math.random() * length);
}

var sendMessage = function(user, message, cb) {
    var messageData = {
        to: user.phone,
        from: config.twilioFrom,
        body: message
    };

    twilio.sendMessage(messageData, function(err, responseData) {
        if (err) {
            console.log('twilio error', err);
            return cb();
        }
        if (responseData) {
            console.log('twilio response', responseData);
            return cb();
        }
    });
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
            return cb();
        }
        return cb();
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
                return cb();
            }
            if (lyrics.length === 0) {
                console.log('No lyrics found');
                return cb();
            }

            var today = lyrics[getRandom(lyrics.length)];
            var message = today.quote + " - " + today.artist + " (motiviz.js)";

            // iterate through each number
            found.forEach(function(user) {
                sendMessage(user, message, function() {
                    today.sent = Date();
                    today.save(function(err) {
                        if (err) {
                            console.log('could not update lyric sent date', err);
                            return cb();
                        }
                        return cb();
                    });
                });
            });
        });

    });
};

module.exports.sendWelcome = function(phone, cb) {
    // find phone number in DB
    User.findOne({ phone: phone }, function(err, foundUser) {
        if (err) {
            console.log('Could not find phone number', err);
            return false;
        }
        if (foundUser.length === 0) {
            console.log('Phone number does not exist ' + phone);
            return false;
        }

        var message = "Welcome to motiviz.  Blood in, blood out.  Tim, where's the contact card huh?!";
        sendMessage(foundUser, message, function() {
            return cb();
        });
    });
};

