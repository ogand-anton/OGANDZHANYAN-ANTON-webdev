module.exports = function (app) {
    var mongoose = require("mongoose");

    return mongoose.Schema({
        username: {type: String, required: true, trim: true, unique: true},
        password: {type: String, required: true},
        firstName: {type: String},
        lastName: {type: String},
        email: {type: String},
        phone: {type: String},
        websites: [{type: mongoose.Schema.Types.ObjectId, ref: "website"}],
        dateCreated: {type: Date, required: true, default: Date.now}
    }, {collection: "user"});
};