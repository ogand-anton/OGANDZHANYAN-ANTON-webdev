(function () {
    angular
        .module("WamApp")
        .controller("pageNewController", pageNewController);

    function pageNewController($routeParams, $location, sharedService, pageService) {
        var vm = this,
            uid,
            wid;

        vm.savePage = savePage;

        (function init() {
            _parseRouteParams();
            _fetchTemplates();
            _initHeaderFooter();
            _loadContent();
        })();

        function savePage() {
            pageService
                .createPage(wid, vm.pageInfo)
                .then(function (res) {
                    if (res.msg) {
                        vm.errorMsg = res.msg;
                    } else {
                        $location.url("/user/" + uid + "/website/" + wid + "/page");
                    }
                });
        }

        function _fetchTemplates() {
            vm.templates = Object.assign(
                sharedService.getTemplates(),
                pageService.getTemplates()
            );
        }

        function _initHeaderFooter() {
            vm.navHeader = {
                leftLink: {
                    href: "#!/user/" + uid + "/website/" + wid + "/page",
                    iconClass: "glyphicon-triangle-left",
                    name: "Pages"
                },
                name: "New Page",
                rightLink: {
                    clickCb: savePage,
                    href: "javascript:void(0)",
                    iconClass: "glyphicon-floppy-save",
                    name: "Save"
                }
            };
            vm.navFooter = [
                {href: "#!/user/" + uid, iconClass: "glyphicon-user", sizeClass: "col-xs-6"},
                {
                    href: "#!/user/" + uid + "/website/" + wid + "/page/new",
                    iconClass: "glyphicon-plus",
                    sizeClass: "col-xs-6"
                }
            ];
        }

        function _loadContent() {
            vm.pageInfo = {};

            pageService
                .findPagesByWebsiteId(wid)
                .then(function (res) {
                    vm.pages = res.pages;
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