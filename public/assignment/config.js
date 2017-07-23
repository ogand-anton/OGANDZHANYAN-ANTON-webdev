(function() {
    angular
        .module("WamApp")
        .config(configure);

    function configure($routeProvider) {
        $routeProvider
             .when("/", {
                 templateUrl: "view/home/templates/template_home.html"
             })
            .when("/login", {
                templateUrl: "view/user/templates/template_login.html",
                controller: "loginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "view/user/templates/template_register.html",
                controller: "registerController",
                controllerAs: "model"
            })
            .when("/user/:uid", {
                templateUrl: "view/user/templates/template_profile.html",
                controller: "profileController",
                controllerAs: "model"
            })
            .when("/user/:uid/website", {
                templateUrl: "view/website/templates/template_website_list.html",
                controller: "websiteListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/new", {
                templateUrl: "view/website/templates/template_website_new.html",
                controller: "websiteNewController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid", {
                templateUrl: "view/website/templates/template_website_edit.html",
                controller: "websiteEditController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page", {
                templateUrl: "view/page/templates/template_page_list.html",
                controller: "pageListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/new", {
                templateUrl: "view/page/templates/template_page_new.html",
                controller: "pageNewController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid", {
                templateUrl: "view/page/templates/template_page_edit.html",
                controller: "pageEditController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget", {
                templateUrl: "view/widget/templates/template_widget_list.html",
                controller: "widgetListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/new", {
                templateUrl: "view/widget/templates/template_widget_new.html",
                controller: "widgetNewController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid", {
                templateUrl: "view/widget/templates/template_widget_edit.html",
                controller: "widgetEditController",
                controllerAs: "model"
            })
    }
})();