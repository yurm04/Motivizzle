// add.js =============================

var User = require('../models/User.js');

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

module.exports.formHandler = function(req, res) {
    var phone = req.body.phone;

    if (!phone) {
        return (res.status(400).send('No Phone Number Passed.'));    // no phone number passed, bad request
    }

    var validPhone = validatePhone(phone);

    if (!validPhone) {
        return (res.status(400).send('Invalid phone number.'));
    }

    // check if number exists
    User.find({phone : validPhone}, function(err, foundPhone) {
        if (err) {
            return (res.status(500).send('An error occurred'));
        }
        if (foundPhone.length > 0) {
            console.log(foundPhone);
            return (res.status(409).send('Phone number already exists'));
        }

        // if no record exists create
        var user = User();
        user.phone = validPhone;

        user.save(function(err) {
            if (err) {
                return (res.status(500).send('Unable to add phone number'));
            }

            return (res.status(200).send('Successfully added phone number'));
        });
    });
};