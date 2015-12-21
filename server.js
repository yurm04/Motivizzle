// server.js ==========================

var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var handlebars  = require('express-handlebars');

var add         = require('./src/routes/add.js');
var unsubscribe = require('./src/routes/remove.js');
var PORT        = process.env.PORT || 3000;

// create DB connection
mongoose.connect('mongodb://127.0.0.1/motiviz');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error: '));
db.once('open', function() {
    console.log('successfully connected to DB');
});

// set path for static files
app.use(express.static(__dirname + '/public'));

// use body-parser middleware to access HTTP request/response body
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

// set handlebars as the templating engine
app.engine('.handlebars', handlebars({defaultLayout: 'main', extension: '.handlebars'}));
app.set('view engine', '.handlebars');

// route to homepage
app.get('/', function(req, res) {
    // res.sendFile(__dirname + '/index.html');
    res.render('signup', {success: {message: 'You did it!'}});
});

// route handlers
app.post('/add', add.formHandler);                  // route to form handler
app.post('/unsubscribe', unsubscribe.remove);       // route to unsubscribe handler

var server = app.listen(PORT, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Listening on port ' + port);
});