(function() {
    angular
        .module("WamApp")
        .controller("loginController", loginController);

    function loginController($location, userService) {
        var vm = this;

        vm.login = login;

        console.log("Hello from login");

        function login(loginInfo) {
            userService
                .findUserByCredentials(loginInfo)
                .then(function(res){
                    if (res.msg) {
                        vm.errorMsg = res.msg;
                    }
                    else {
                        $location.url("/user/" + res.user._id);
                    }
                });
        }
    }
})();