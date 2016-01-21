// quote.js ===========================

var motiviz = require('../../modules/motiviz.js');


// gets a random quote from db and sends it back
module.exports.getRandom = function(req, res) {
    motiviz.getRandomQuote(function(err, message) {
        if (err) {
            res.send('Could not motivate you');
        }

        if (message) {
            res.send(message);
        }
    });
};