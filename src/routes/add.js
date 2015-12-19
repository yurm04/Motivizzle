// add.js =============================

var User = require('./src/models/User.js');

var validatePhone = function(phone) {
    if (!phone || phone.length < 10) {
        return false;
    }

    var sanitized = phone.trim().replace(/\D/g, '');        // replace non numeric chars with empty string

    if (!sanitized || sanitized.length < 10) {
        return false;
    }

    var validFormat = '+' + sanitized;                      // saves in twillio format
    return validFormat;
};

modules.exports.formHandler = function(req, res) {
    var phone = req.params.phone;

    if (!phone) {
        return (res.status(400).send('No Phone Number Passed.'));    // no phone number passed, bad request
    }

    var validPhone = validPhone(phone);

    if (!validPhone) {
        return (res.status(400).send('Invalid phone number.'));
    }

    var user = User();
    user.phone = validPhone;

    user.save(function(err) {
        if (err) {
            return (res.status(500).send('Unable to add phone number'));
        }

        return (res.status(200).send('Successfully added phone number'));
    });
};