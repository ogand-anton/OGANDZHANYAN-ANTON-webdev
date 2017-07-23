(function() {
    angular
        .module("WamApp")
        .controller("loginController", loginController);

    function loginController($location, userService) {
        var vm = this;

        vm.login = login;

        function login(loginInfo) {
            loginInfo = loginInfo || {};

            var response = userService.findUserByCredentials(loginInfo.username, loginInfo.password);

            if (response.msg) {
                vm.errorMsg = response.msg;
            }
            else {
                $location.url("/user/" + response.user._id);
            }
        }
    }
})();