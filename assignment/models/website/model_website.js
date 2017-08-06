module.exports = function (app) {
    var mongoose = require("mongoose"),
        websiteSchema = app.aoaRequire("/assignment/models/website/schema_website.js")(app),
        websiteModel = mongoose.model("websiteModel", websiteSchema, websiteSchema.options.collection);

    return Object.assign(websiteModel, {
        createWebsiteForUser: createWebsiteForUser,
        deleteWebsite: deleteWebsite,
        findWebsitesForUser: findWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite
    });

    function createWebsiteForUser(userId, newWebsite) {
        newWebsite._user = userId;
        return websiteModel.create(newWebsite);
    }

    function deleteWebsite(websiteId){
        return websiteModel.remove({_id: websiteId});
    }

    function findWebsitesForUser(userId){
        return websiteModel.find({_user: userId});
    }

    function findWebsiteById(websiteId) {
        return websiteModel.findOne({_id: websiteId});
    }

    function updateWebsite(websiteId, website) {
        return websiteModel.update({_id: websiteId}, {$set: website});
    }
};