// movitiz.js =========================

var User   = require('./src/models/User.js');
var Lyric  = require('./src/models/Lyric.js');
var config = require('./config.js');

var twilio = require('twilio')(config.twilioSID, config.twilioToken);

var getLyric = function() {
    Lyric.find({ sent: null }, function(err, lyrics) {
        if (err) {
            console.log('Could not get lyric', Date().toString(), err);
        }

        lyrics.forEach(function(lyric) {

        });
    });
};

var sendMessage = function(phone) {
    var messageData = {
        to: phone,
        from: config.twilioFrom,
        message: getLyric()
    };

    client.sendMessage(messageData);
};

module.exports.sendDaily = function() {
    User.find({ active : 1 }, function(err, found) {
        if (err) {
            console.log('Could not send daily text', Date().toString(), err);
        }

        // iterate through each number
        found.forEach(function(user) {

        });
    });
};

module.exports.sendWelcome = function() {

};