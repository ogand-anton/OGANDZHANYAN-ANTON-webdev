module.exports = function (app) {
    var mongoose = require("mongoose");

    return mongoose.Schema({
        _website: {type: mongoose.Schema.Types.ObjectId, ref: "website"},
        name: {type: String},
        title: {type: String},
        description: {type: String},
        widgets: [{type: mongoose.Schema.Types.ObjectId, ref: "widget"}],
        dateCreated: {type: Date, required: true, default: Date.now}
    }, {collection: "page"});
};