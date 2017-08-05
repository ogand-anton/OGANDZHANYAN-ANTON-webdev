module.exports = getDbInstance();

function getDbInstance() {
    var mongoose = require("mongoose"),
        q = require("q");

    mongoose.Promise = q.Promise;

    var connectionString = 'mongodb://127.0.0.1:27017/test'; // for local
    if (process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
        var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
        var password = process.env.MLAB_PASSWORD_WEBDEV;
        connectionString = 'mongodb://' + username + ':' + password;
        connectionString += '@ds149382.mlab.com:49382/heroku_3djpv444'; // user yours
    }

    return mongoose.connect(connectionString, {useMongoClient: true});
}