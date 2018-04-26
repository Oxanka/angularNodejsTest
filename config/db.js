
var mongoose = require('mongoose');
module.exports = function(mongoose, env) {
    mongoose.Promise = global.Promise;
    mongoose.connect(env.db.URI, { useMongoClient: true });
    mongoose.set('debug', true);

    mongoose.connection.on('connected', function () {
        console.log('Server connected to db');
    })
    var connRetry = env.db.retry;

    mongoose.connection.on('error', function (err) {
        if (connRetry > 0) {
            console.log(err);
            console.log('Server failed to connect to db');
            connRetry -= 1;
            mongoose.connect(env.db.URI);
        } else {
            console.error('Server failed to connect to db')
        }
    })
}