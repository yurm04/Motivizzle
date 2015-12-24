// add.js =============================

var User    = require('../models/User.js');
var motiviz = require('../../modules/motiviz.js');

var validatePhone = function(phone) {
    if (!phone || phone.length < 10) {
        return false;
    }

    var sanitized = phone.trim().replace(/\D/g, '');        // replace non numeric chars with empty string

    if (!sanitized || sanitized.length < 10 || sanitized.length > 11) {
        return false;
    }

    if (sanitized.charAt(0) !== '1' && sanitized.length !== 11) {
        sanitized = '1' + sanitized;
    }

    var validFormat = '+' + sanitized;                      // saves in twillio format
    return validFormat;
};

module.exports.formHandler = function(req, res) {
    var phone = req.body.phone;

    if (!phone) {
        var data = {
            error : { message: 'Missing phone number.' }
        };
        return (res.status(400).render('signup', data));    // no phone number passed, bad request
    }

    var validPhone = validatePhone(phone);

    if (!validPhone) {
        var data = {
            error : { message: 'Invalid phone number.' }
        };
        return (res.status(400).render('signup', data));
    }

    // check if number exists
    User.find({phone : validPhone}, function(err, foundPhone) {
        if (err) {
            var data = {
                error : { message: 'Could not subscribe.  Try Again.' }
            };
            return (res.status(500).render('signup', data));
        }
        if (foundPhone.length > 0) {
            var data = {
                warning : { message: "Phone number already exists" }
            };
            return (res.status(409).render('signup', data));
        }
        console.log('still going');
        // if no record exists create
        var user = User();
        user.phone = validPhone;

        user.save(function(err) {
            if (err) {
                var data = {
                    error : { message: 'Could not subscribe.  Try Again.' }
                };
                return (res.status(500).render('signup', data));
            }

            var data = {
                success : { message: "Sucessfully subscribed." }
            };
            motiviz.sendWelcome(user.phone , function(err) {
                if (err) {
                    // handle error?
                    return false;
                }

                return (res.status(200).render('signup', data));
            });
        });
    });
};