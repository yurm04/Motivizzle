// user.js ============================

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    phone : {type: String, required: true},
    active : {type: Boolean, require: true, default: 1}
});

module.exports = mongoose.model('User', userSchema);