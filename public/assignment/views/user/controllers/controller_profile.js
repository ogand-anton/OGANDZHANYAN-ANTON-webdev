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

            userService
                .findUserById(uid)
                .then(function(res){
                    vm.errorMsg = res.msg;
                    vm.profileInfo = res.user;
                });
        })();

        function saveUser(profileInfo){
            userService
                .updateUser(uid, profileInfo)
                .then(function(res){
                    vm.errorMsg = res.msg;
                    vm.successMsg = res.msg ? null : "Profile Updated";
                });
        }
    }
})();