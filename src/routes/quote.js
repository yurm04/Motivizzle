// quote.js ===========================

var motiviz = require('../../modules/motiviz.js');
var SLACK_TOKEN = process.env.SLACK_TOKEN;


// gets a random quote from db and sends it back
module.exports.getRandom = function(req, res) {
    if (req.query.token !== SLACK_TOKEN) {
        return res.send('You ain\'t authorized.');
    }

    motiviz.getRandomQuote(function(err, message) {
        if (err) {
            return res.send('Could not motivate you');
        }

        if (message) {
            return res.send(message);
        }
    });
};