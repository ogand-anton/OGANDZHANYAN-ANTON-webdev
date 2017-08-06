var model;

module.exports = function (app) {
    if (!model) {
        model = {
            pageModel: app.aoaRequire("assignment/models/page/model_page.js")(app),
            userModel: app.aoaRequire("assignment/models/user/model_user.js")(app),
            websiteModel: app.aoaRequire("assignment/models/website/model_website.js")(app)
        }
    }

    return model;
};