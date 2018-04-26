var express = require('express'),
    http = require('http'),
    app = express();
var path = require("path");
var favicon = require('serve-favicon');
var debug = require('debug')(process.env.DEBUG);
var Sequelize = require("sequelize");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var busboy = require('connect-busboy');
var expressValidator = require('express-validator');
var expressSession =  require('express-session');
var cookieParser = require('cookie-parser');
var md5 = require('js-md5');
var env = require('./config/env')
var db = require('./config/db');
global.models = require('./models/index')();


app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
var mongoose = require('mongoose');

require('./config/db')(mongoose, env);

app.use(busboy());
app.use(expressValidator());
app.use(cookieParser());
app.use(expressSession({ secret: 'efs', resave: true, saveUninitialized: true }));

var routers = require('./routes');

var port = normalizePort(process.env.PORT || '3030');
app.set('port', port);

//API
// app.use('/api/', function(req, res){
//     require('./routes/index.js')
// });
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '750mb', extended: true}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
    next();
});

console.log("App started in port "+port);
console.log("env "+env);
/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}



routers.init(app);
var server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

// handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
    console.log('Listening on ' + bind);
}
