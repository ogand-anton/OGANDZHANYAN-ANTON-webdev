// define module and dependencies
var app = angular.module("WamApp", ["ngRoute"]); // app = "module" variable

// declare controller
app.controller("loginController", loginController);
app.controller("profileController", profileController);

// angular function to configure things
// first thing that happens in the app (no html, no controllers, no users, no data)
app.config(configuration);

// providers allow configuration of modules
// configuring routes here particularly
function configuration($routeProvider) {
    $routeProvider
        .when("/login", { tempalteUrl: "login.html" })
        .when("/profile/:userID", {templateUrl:"profile.html"}); //:userID is a place holder
}

function profileController($scope, $routeParams) {
    var userID = $routeParams[userID]; // retrieve userID param from url
}

// define controller
// called when angular binds this controller to an element with ng-controller attribute
// $scope is available in JS context and html context
function loginController($scope, $location) { //$location embodies url interaction
    // defining scope variables
    $scope.hello = "LoginController says hi :3";

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    // defining event callbacks
    // args are nice from bound elements
    $scope.login = function(user) {
        for(var u in users) { //u here is an index
            var _user = users[u];
            if (_user.username === user.username && _user.password === user.password) {
                $scope.welcomeUser = _user;
                break;
            }
            $scope.welcomeUser = null;
        }

        if ($scope.welcomeUser) {
            $location.url("profile/"+_user.id)
        } else { // routing url configured above
            alert("Access Denied");
        }
    }
}