module.exports = function (app) {
    return {
        pageModel: app.aoaRequire("assignment/models/page/model_page.js")(app),
        userModel: app.aoaRequire("assignment/models/user/model_user.js")(app),
        websiteModel: app.aoaRequire("assignment/models/website/model_website.js")(app),
        widgetModel: app.aoaRequire("assignment/models/widget/model_widget.js")(app)
    };
};