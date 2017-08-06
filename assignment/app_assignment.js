module.exports = function(app) {
    var model = app.aoaRequire("assignment/models/model.js")(app);

    app.aoaRequire("assignment/services/service_page.js")(app, model);
    app.aoaRequire("assignment/services/service_user.js")(app, model);
    app.aoaRequire("assignment/services/service_website.js")(app, model);
    app.aoaRequire("assignment/services/service_widget.js")(app, model);
};