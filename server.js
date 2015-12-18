// server.js ==========================

var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

var User       = require('./src/models/User.js');
var Lyric      = require('./src/models/Lyric.js');

var PORT       = process.env.PORT || 3000;

// set path for static files
app.use(express.static(__dirname + '/public'));

// use body-parser middleware to access HTTP request/response body
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

// route to homepage
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

// route to form handler
app.post('/add', function(req,res) {
    var phone = req.body.phone;

    // no phone number sent, reject
    if (!phone) {
        res.send('Error');
    } else {
        res.redirect('/');
    }
});

var server = app.listen(PORT, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Listening on port ' + port);
});