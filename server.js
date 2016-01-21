// server.js ==========================

var express      = require('express');
var app          = express();
var bodyParser   = require('body-parser');
var helmet       = require('helmet');
var mongoose     = require('mongoose');
var handlebars   = require('express-handlebars');

var logger       = require('./modules/logger.js');
var add          = require('./src/routes/add.js');
var quote        = require('./src/routes/quote.js');
var unsubscribe  = require('./src/routes/remove.js');
var config       = require('./config.js');
var PORT         = process.env.PORT || config.port;
var MONGOLAB_URI = process.env.MONGOLAB_URI;

// create DB connection
mongoose.connect(MONGOLAB_URI);
var db = mongoose.connection;
// var db = mongoose.connection;
db.on('error', function(err) {
    logger.error('Could not connect to database: ' + err.message);
});
db.once('open', function() {
    logger.info('Connected to database.');
});

//
app.use(helmet());

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
    res.render('signup');
});

// route to get random quote
app.get('/quote', quote.getRandom);

app.post('/', add.formHandler);


var server = app.listen(PORT, function() {
    var port = server.address().port;
    logger.info('Listening on port ' + port);
});
