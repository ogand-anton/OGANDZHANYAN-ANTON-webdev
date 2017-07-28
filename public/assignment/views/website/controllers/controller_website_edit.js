(function () {
    angular
        .module("WamApp")
        .controller("websiteEditController", websiteEditController);

    function websiteEditController($routeParams, $location, sharedService, websiteService) {
        var vm = this,
            uid,
            wid;

        vm.deleteWebsite = deleteWebsite;
        vm.saveWebsite = saveWebsite;

        (function init() {
            _parseRouteParams();
            _fetchTemplates();
            _initHeaderFooter();
            _loadContent();
        })();

        function deleteWebsite() {
            websiteService
                .deleteWebsite(wid)
                .then(function (res) {
                    if (res.msg) {
                        vm.errorMsg = res.msg;
                    } else {
                        $location.url("/user/" + uid + "/website");
                    }
                });
        }

        function saveWebsite() {
            websiteService
                .updateWebsite(wid, vm.websiteInfo)
                .then(function (res) {
                    vm.errorMsg = res.msg;
                    vm.successMsg = res.msg ? null : "Website updated";

                    _getWebsiteList();
                });
        }

        function _fetchTemplates() {
            vm.templates = Object.assign(
                sharedService.getTemplates(),
                websiteService.getTemplates()
            );
        }

        function _getWebsiteList() {
            websiteService
                .findWebsitesByUser(uid)
                .then(function (res) {
                    vm.websites = res.websites;
                });
        }

        function _initHeaderFooter() {
            vm.navHeader = {
                leftLink: {href: "#!/user/" + uid + "/website", iconClass: "glyphicon-triangle-left", name: "Websites"},
                name: "Edit Website",
                rightLink: {
                    clickCb: saveWebsite,
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
            _getWebsiteList();

            websiteService
                .findWebsiteById(wid)
                .then(function (res) {
                    vm.errorMsg = res.msg;
                    vm.websiteInfo = res.website;
                });
        }

        function _parseRouteParams() {
            uid = $routeParams["uid"];
            vm.uid = uid;

            wid = $routeParams["wid"];
            vm.wid = wid;
        }
    }
})();