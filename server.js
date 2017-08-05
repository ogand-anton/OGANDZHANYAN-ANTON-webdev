// dependencies
var bodyParser = require("body-parser"),
    express = require("express"),
    multer = require("multer");


// app initialization
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(multer({dest: __dirname + "/public/uploads"}).single("file"));
app.listen(process.env.PORT || 3000);

// helper method for importing modules with paths relative to root
app.aoaRequire = function (modulePath) {
    return require(app.aoaRelativeFilePath(modulePath));
};

// helper method for generating a path relative to the root directory
app.aoaRelativeFilePath = function(path){
    return __dirname + "/" + path;
};

// app imports
app.aoaRequire("assignment/app_assignment.js")(app);
app.aoaRequire("db/db.js");
app.aoaRequire("test/app_test.js")(app);