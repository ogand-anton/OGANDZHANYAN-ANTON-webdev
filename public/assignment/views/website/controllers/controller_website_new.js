(function () {
    angular
        .module("WamApp")
        .controller("websiteNewController", websiteNewController);

    function websiteNewController($routeParams, $location, sharedService, websiteService) {
        var vm = this,
            uid;

        (function init() {
            _parseRouteParams();
            _fetchTemplates();
            _initHeaderFooter();
            _loadContent();
        })();

        function _fetchTemplates() {
            vm.templates = Object.assign(
                sharedService.getTemplates(),
                websiteService.getTemplates()
            );
        }

        function _initHeaderFooter() {
            vm.navHeader = {
                leftLink: {href: "#!/user/" + uid + "/website", iconClass: "glyphicon-triangle-left", name: "Websites"},
                name: "New Website",
                rightLink: {
                    clickCb: _saveWebsite,
                    href: "javascript:void(0)",
                    iconClass: "glyphicon-floppy-save",
                    name: "Save"
                }
            };
            vm.navFooter = [
                {href: "#!/user/" + uid, iconClass: "glyphicon-user", sizeClass: "col-xs-6"},
                {href: "#!/user/" + uid + "/website/new", iconClass: "glyphicon-plus", sizeClass: "col-xs-6"}
            ];
        }

        function _loadContent() {
            vm.websiteInfo = {};

            websiteService
                .findWebsitesByUser(uid)
                .then(function (res) {
                    vm.websites = res.websites;
                });
        }

        function _parseRouteParams() {
            uid = $routeParams["uid"];
            vm.uid = uid;
        }

        function _saveWebsite() {
            websiteService
                .createWebsite(uid, vm.websiteInfo)
                .then(function (res) {
                    if (res.msg) {
                        vm.errorMsg = res.msg;
                    } else {
                        $location.url("/user/" + uid + "/website");
                    }
                });
        }
    }
})();