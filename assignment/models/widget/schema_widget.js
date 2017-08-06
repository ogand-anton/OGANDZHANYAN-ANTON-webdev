module.exports = function (app) {
    var mongoose = require("mongoose");

    return mongoose.Schema({
        _page: {type: mongoose.Schema.Types.ObjectId, ref: "page"},
        widgetType: {type: String, enum: ["HEADING", "IMAGE", "YOUTUBE", "HTML", "TEXT"]},
        name: {type: String},
        text: {type: String},
        description: {type: String},
        placeholder: {type: String},
        url: {type: String},
        width: {type: String, default: "100%"},
        height: {type: String},
        rows: {type: Number},
        size: {type: Number},
        class: {type: String},
        icon: {type: String},
        deletable: {type: Boolean},
        formatted: {type: Boolean},
        sortIndex: {type: Number},
        dateCreated: {type: Date, required: true, default: Date.now}
    }, {collection: "widget"});
};