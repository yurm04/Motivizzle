// lyric.js ===========================

var mongoose = require('mongoose');

var lyricSchema = mongoose.Schema({
    quote: { type: String, required: true },
    artist: { type: String, required: true },
    sent: { type: Date, required: false }
});

module.exports = mongoose.model('Lyric', lyricSchema);