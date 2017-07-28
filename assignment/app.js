module.exports = function(app) {
    app.aoaRequire("assignment/services/service_page.js")(app);
    app.aoaRequire("assignment/services/service_user.js")(app);
    app.aoaRequire("assignment/services/service_website.js")(app);
    app.aoaRequire("assignment/services/service_widget.js")(app);
};