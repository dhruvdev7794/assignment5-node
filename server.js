var express = require('express');
var app = express();
var bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.connect('mongodb://heroku_d7j4c8rz:1s692pte8h4k4qktqd929r0ccj@ds049170.mlab.com:49170/heroku_d7j4c8rz');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin',
        'https://assignment5-wbdv-angular.herokuapp.com');
        // 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers',
        'Origin, A-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods',
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header('Access-Control-Allow-Credentials',
        'true');
    next();
});


var session = require('express-session');
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'Any string'
}));

app.get('/api/session/set/:name/:value',
    setSession);
app.get('/api/session/get/:name',
    getSession);

function setSession(req, res) {
    var name = req.params['name'];
    var value = req.params['value'];
    req.session[name] = value;
    res.send(req.session);
}

function getSession(req, res) {
    var name = req.params['name'];
    var value = req.session[name];
    res.send(value);
}


app.get('/', function (req, res) {
    res.send('Hello World')
})

app.get('/message/:theMessage', function (req, res) {
    var theMessage = req.params['theMessage']
    res.send(theMessage)
})

var userService = require('./services/user.service.server');
userService(app);

require('./services/section.service.server')(app);

// app.listen(4000);
app.listen(process.env.PORT || 4000, function () {

});