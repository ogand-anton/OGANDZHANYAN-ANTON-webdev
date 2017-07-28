(function () {
    angular
        .module("WamApp")
        .controller("pageEditController", pageEditController);

    function pageEditController($routeParams, $location, sharedService, pageService) {
        var vm = this,
            uid, wid, pid;

        vm.deletePage = deletePage;
        vm.savePage = savePage;

        (function init() {
            _parseRouteParams();
            _fetchTemplates();
            _initHeaderFooter();
            _loadContent();
        })();

        function deletePage() {
            pageService
                .deletePage(pid)
                .then(function (res) {
                    if (res.msg) {
                        vm.errorMsg = res.msg;
                    } else {
                        $location.url("/user/" + uid + "/website/" + wid + "/page");
                    }
                });
        }

        function savePage() {
            pageService
                .updatePage(pid, vm.pageInfo)
                .then(function (res) {
                    vm.errorMsg = res.msg;
                    vm.successMsg = res.msg ? null : "Page Updated";

                    _getPageList();
                });
        }

        function _fetchTemplates() {
            vm.templates = Object.assign(
                sharedService.getTemplates(),
                pageService.getTemplates()
            );
        }

        function _getPageList() {
            pageService
                .findPagesByWebsiteId(wid)
                .then(function (res) {
                    vm.pages = res.pages;
                });
        }

        function _initHeaderFooter() {
            vm.navHeader = {
                leftLink: {
                    href: "#!/user/" + uid + "/website/" + wid + "/page",
                    iconClass: "glyphicon-triangle-left",
                    name: "Pages"
                },
                name: "Edit Page",
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
            _getPageList();

            pageService
                .findPageById(pid)
                .then(function (res) {
                    vm.errorMsg = res.msg;
                    vm.pageInfo = res.page;
                })
        }

        function _parseRouteParams() {
            uid = $routeParams["uid"];
            vm.uid = uid;

            wid = $routeParams["wid"];
            vm.wid = wid;

            pid = $routeParams["pid"];
            vm.pid = pid;
        }
    }
})();