module.exports = function (app) {
    var mongoose = require("mongoose");

    return mongoose.Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
        name: {type: String},
        description: {type: String},
        pages: [{type: mongoose.Schema.Types.ObjectId, ref: "page"}],
        dateCreated: {type: Date, required: true, default: Date.now}
    }, {collection: "website"});
};