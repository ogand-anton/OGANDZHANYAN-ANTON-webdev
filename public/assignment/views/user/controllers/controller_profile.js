(function () {
    angular
        .module("WamApp")
        .controller("profileController", profileController);

    function profileController($routeParams, sharedService, userService) {
        var vm = this,
            uid;

        vm.saveUser = saveUser;

        (function init() {
            _parseRouteParams();
            _fetchTemplates();
            _initHeaderFooter();
            _loadContent();
        })();

        function saveUser() {
            userService
                .updateUser(uid, vm.profileInfo)
                .then(function (res) {
                    vm.errorMsg = res.msg;
                    vm.successMsg = res.msg ? null : "Profile Updated";
                });
        }

        function _fetchTemplates() {
            vm.templates = sharedService.getTemplates();
        }

        function _initHeaderFooter() {
            vm.navHeader = {
                leftLink: {href: "#!/login", iconClass: "glyphicon-log-out", name: "Logout"},
                name: "Profile",
                rightLink: {
                    clickCb: saveUser,
                    href: "javacript:void(0)",
                    iconClass: "glyphicon-floppy-save",
                    name: "Save"
                }
            };
            vm.navFooter = [
                {
                    href: "#!/user/" + uid + "/website",
                    iconClass: "glyphicon-duplicate",
                    name: "Websites",
                    sizeClass: "col-xs-12"
                }
            ];
        }

        function _loadContent() {
            userService
                .findUserById(uid)
                .then(function (res) {
                    vm.errorMsg = res.msg;
                    vm.profileInfo = res.user;
                });
        }

        function _parseRouteParams() {
            uid = $routeParams["uid"];
            vm.uid = uid;
        }
    }
})();