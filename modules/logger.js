// logger.js ==========================

var fs = require('fs');
var moment = require('moment');

var config = require('../config.js');
var ERROR_FILE = config.errorPath;
var DAILY_FILE = config.dailyPath;
var ACTIVITY_FILE = config.activityPath;

function logToFile(file, data) {
    // opens file at path with 'append' flag
    fs.open(file, 'a', function(err, fd) {
        if (err) {
            console.log('could not open log file:', file);
            return false;
        }
        fs.appendFile(file, data, function(err) {
            if (err) {
                console.log('could not add data to file', file);
                return false;
            }
            fs.close(fd, function(err) {
                if (err) {
                    console.log('could not close file', file);
                    return false;
                }
                return true;
            });
        });
    });
}

module.exports.logDaily = function(count, total) {
    var message;
    if (count === total) {
        message = 'Successfully sent ' + count + ' of ' + total + ' daily messages.';
    } else {
        message = 'Sent ' + count + ' of ' + total + ' daily messages.';
    }
    logToFile(DAILY_FILE, message);
};

module.exports.logError = function() {

};

module.exports.logActivity = function() {

};