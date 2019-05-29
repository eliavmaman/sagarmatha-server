// call the packages we need
const express = require('express');        // call express
const app = express();                 // define our app using express
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

var path = require("path");

const server = http.createServer(app);

const cors = require('cors');
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//mongoose.createConnection( 'mongodb://localhost/yarderstore' );
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/UserOrderDB');
//mongoose.connect(`mongodb://heroku_dvsj3jz2:3alctm01l827rf44v6dfqurqdb@ds215093.mlab.com:15093/heroku_dvsj3jz2`);

var port = process.env.PORT || 3000;        // set our port

// ROUTES FOR OUR API
// =============================================================================
const router = require('./router');            // get an instance of the express Router
var numOusers = 0;
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({message: 'hooray! welcome to our api!'});
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
app.get('/', function (req, res) {
    res.sendFile('./public/index.html', {root: __dirname});
});
mongoose.Promise = global.Promise;


// START THE SERVER
// =============================================================================
//app.listen(port);
// console.log('Magic happens on port ' + port);\
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
// we wait till mongo is ready before letting the http handler query users:
db.once('open', function () {
    console.log('Running');


});
server.listen(port, () => {
    console.log('Server listen on port 3000');
});

//var notificationsScheduler = new NotificationsScheduler();
//notificationsScheduler.start();