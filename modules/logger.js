// logger.js ==========================

var winston = require('winston');

var config = require('../config.js');

module.exports = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({
            name: 'error',
            filename: config.errorPath,
            level: 'error',
            handleExceptions: true,
        }),
        new (winston.transports.File)({
            name: 'activity',
            filename: config.activityPath,
            level: 'info',
        }),
    ]
});