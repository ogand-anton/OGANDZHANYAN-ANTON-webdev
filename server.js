(function(require, environment, hostDirPath) {
    // dependencies
    var bodyParser = require("body-parser");
    var express = require("express");

    // app initialization
    var app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(express.static(hostDirPath + "/public"));
    app.listen(environment.PORT || 3000);

    // app imports
    require("./test/app.js")(app);
    require("./assignment/app.js")(app);
})(require, process.env, __dirname);