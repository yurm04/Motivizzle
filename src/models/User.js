// user.js ============================

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    phone : { type: String, required: true },
    created_at : { type: Date, required: true, default: Date() },
    updated_at: { type: Date, required: false },
    active : { type: Boolean, require: true, default: 1 }
});

module.exports = mongoose.model('User', userSchema);