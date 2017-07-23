(function() {
    angular
        .module("WamApp")
        .controller("registerController", registerController);

    function registerController($location, userService) {
        var vm = this;

        vm.registerUser = registerUser;

        function registerUser(userInfo) {
            var response = userService.createUser(userInfo);

            if (response.msg) {
                vm.errorMsg = response.msg;
            } else {
                $location.url("/user/" + response.user._id)
            }
        }
    }
})();