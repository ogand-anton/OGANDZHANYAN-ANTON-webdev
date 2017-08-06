module.exports = function (app) {
    var mongoose = require("mongoose"),
        pageSchema = app.aoaRequire("/assignment/models/page/schema_page.js")(app),
        pageModel = mongoose.model("pageModel", pageSchema, pageSchema.options.collection);

    return Object.assign(pageModel, {
        createPageForWebsite: createPageForWebsite,
        deletePage: deletePage,
        findPagesForWebsite: findPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage
    });

    function createPageForWebsite(websiteId, newPage) {
        newPage._website = websiteId;
        return pageModel.create(newPage);
    }

    function deletePage(pageId){
        return pageModel.remove({_id: pageId});
    }

    function findPagesForWebsite(websiteId){
        return pageModel.find({_website: websiteId});
    }

    function findPageById(pageId) {
        return pageModel.findOne({_id: pageId});
    }

    function updatePage(pageId, page) {
        return pageModel.update({_id: pageId}, {$set: page});
    }
};