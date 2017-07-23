(function() {
    angular
        .module("WamApp")
        .controller("profileController", profileController);

    function profileController($routeParams, userService) {
        var vm = this,
            uid;

        vm.saveUser = saveUser;

        (function init() {
            uid = $routeParams["uid"];
            vm.uid = uid;

            var findUserRs = userService.findUserById(uid);

            if (!findUserRs.user) {
                vm.errorMsg = "User does not exist"
            }
            else {
                vm.username = findUserRs.user.username;
                vm.emailAddress = findUserRs.user.emailAddress;
                vm.firstName = findUserRs.user.firstName;
                vm.lastName = findUserRs.user.lastName;
            }
        })();

        function saveUser(profileInfo){
            var updateUserRs = userService.updateUser(uid, profileInfo);

            if (updateUserRs.msg) {
                vm.errorMsg = updateUserRs.msg;
                vm.successMsg = null;
            } else {
                vm.successMsg = "Profile Updated";
                vm.errorMsg = null;
            }
        }
    }
})();