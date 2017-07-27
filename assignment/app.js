// TODO IIFE not needed on server
(function(module, require) {
    module.exports = assignmentApp;

    function assignmentApp(app) {
        require("./services/service_page.js")(app);
        require("./services/service_user.js")(app);
        require("./services/service_website.js")(app);
        require("./services/service_widget.js")(app);
    }
})(module, require);