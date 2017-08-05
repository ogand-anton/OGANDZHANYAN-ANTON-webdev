module.exports = getUserSchema();

function getUserSchema() {
    var mongoose = require("mongoose");

    return mongoose.Schema({
        username: {type: String, match: /[a-z,1-9]+/, required: true, trim: true, unique: true},
        password: {type: String, required: true},
        firstName: {type: String},
        lastName: {type: String},
        email: {type: String},
        phone: {type: String},
        websites: {type: [String]},
        dateCreated: {type: Date, required: true, default: Date.now}
    }, {collection: "user"});
}