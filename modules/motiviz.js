// movitiz.js =========================

var User         = require('../src/models/User.js');
var Lyric        = require('../src/models/Lyric.js');
var config       = require('../config.js');
var TWILIO_SID   = process.env.TWILIO_SID;
var TWILIO_TOKEN = process.env.TWILIO_TOKEN;
var TWILIO_FROM  = process.env.TWILIO_FROM;
var logger       = require('./logger.js');

var twilio = require('twilio')(TWILIO_SID, TWILIO_TOKEN);

function getRandom(length) {
    return Math.floor(Math.random() * length);
}

var sendMessage = function(user, message, cb) {
    var messageData = {
        to: user.phone,
        from: TWILIO_FROM,
        body: message
    };

    twilio.sendMessage(messageData, function(err, responseData) {
        if (err) {
            logger.error('Could not send twilio message: ' + err.message);
            return cb(true);
        }
        if (responseData) {
            if (responseData.status !== '200') {
                logger.error('Could not send Twilio message: Twilio error.');
                return cb(true);
            }
            return cb();
        }
    });
};

module.exports.addLyric = function(lyric, artist, cb) {
    if (!lyric || !artist) {
        logger.error('Missing required data for new lyric.');
        return cb(true);
    }

    var newLyric = Lyric();

    newLyric.quote = lyric;
    newLyric.artist = artist;

    newLyric.save(function(err) {
        if (err) {
            logger.error('Could not save new lyric.');
            return cb(true);
        }
        return cb();
    });
};

module.exports.sendDaily = function(cb) {
    User.find({ active : 1 }, function(err, found) {

        if (err) {
            logger.error('Could not send daily message.  Unable to get users: ' + err.message);
            return cb(true);
        }

        if (!found || found.length === 0 ) {
            logger.error('Could not send daily message.  No Users found.');
            return cb(true);
        }

        // get random quote
        Lyric.find({ sent: { $exists: false }}, function(err, lyrics) {
            if (err) {
                logger.error('Could not get lyric: ' + err.message);
                return cb(true);
            }
            if (lyrics.length === 0) {
                logger.error('No lyrics found.');
                return cb(true);
            }

            var today = lyrics[getRandom(lyrics.length)];
            var message = today.quote + " - " + today.artist + " (motiviz.js)";

            // iterate through each number
            found.forEach(function(user) {
                sendMessage(user, message, function(err) {
                    if (err) {
                        return cb(true);
                    }
                    today.sent = Date();
                    today.save(function(err) {
                        if (err) {
                            logger.error('could not update lyric sent date: ' + err.message);
                            return cb(true);
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
            logger.error('Could not send welcome message. Unable to get user ' + err.message);
            return cb(true);
        }
        if (foundUser.length === 0) {
            logger.error('Phone number does not exist: ' + phone);
            return cb(true);
        }

        var message = "Welcome to motiviz.  Blood in, blood out.  Tim, where's the contact card huh?!";
        sendMessage(foundUser, message, function(err) {
            if (err) {
                return cb(true);
            }
            return cb();
        });
    });
};

