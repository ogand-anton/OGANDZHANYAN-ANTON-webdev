(function() {
    angular
        .module("WamApp")
        .controller("registerController", registerController);

    function registerController($location, userService) {
        var vm = this;

        vm.registerUser = registerUser;

        function registerUser(userInfo) {
            userService
                .createUser(userInfo)
                .then(function(res){
                    if (res.msg) {
                        vm.errorMsg = res.msg;
                    } else {
                        $location.url("/user/" + res.user._id);
                    }
            });
        }
    }
})();