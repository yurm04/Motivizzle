// movitiz.js =========================

var User               = require('../src/models/User.js');
var Lyric              = require('../src/models/Lyric.js');
var config             = require('../config.js');
var TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
var TWILIO_AUTH_TOKEN  = process.env.TWILIO_AUTH_TOKEN;
var TWILIO_FROM        = process.env.TWILIO_FROM;
var logger             = require('./logger.js');

var twilio = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

function getRandom(length) {
    return Math.floor(Math.random() * length);
}

var sendMessage = function(user, message, vCard, cb) {
    var messageData = {
        to: user.phone,
        from: TWILIO_FROM,
        body: message
    };

   // if (vCard) {
   //     messageData.mediaUrl = vCard;
   // }

    twilio.messages.create(messageData, function(err, responseData) {
        if (err) {
            logger.error('Could not send twilio message: ' + err.message);
            return cb(true);
        }
        if (responseData) {
            if (responseData.error_code !== null || responseData.error_message !== null) {
                logger.error('Could not send Twilio message: Twilio error.');
                return cb(true);
            }
            return cb(null);
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
        return cb(null);
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
            var message = today.quote + " - " + today.artist;

            // iterate through each number
            found.forEach(function(user) {
                sendMessage(user, message, null, function(err) {
                    if (err) {
                        return cb(true);
                    }
                    today.sent = Date();
                    today.save(function(err) {
                        if (err) {
                            logger.error('could not update lyric sent date: ' + err.message);
                            return cb(true);
                        }
                        return cb(null);
                    });
                });
            });
        });

    });
};

module.exports.getRandomQuote = function(cb) {
    Lyric.find({}, function(err, lyrics) {
        if (err) {
            logger.error('Could not get random lyric: ' + err.message);
            return cb(err);
        }

        if (lyrics.length) {
            var quote = lyrics[getRandom(lyrics.length)];
            var message = quote.quote + " - " + quote.artist;

            return cb(null, message);
        }
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

        var message = config.welcomeMessage;
        var vCard = config.vCardUrl;

        sendMessage(foundUser, message, vCard, function(err) {
            if (err) {
                return cb(true);
            }
            return cb(null);
        });
    });
};

