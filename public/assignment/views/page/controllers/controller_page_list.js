(function () {
    angular
        .module("WamApp")
        .controller("pageListController", pageListController);

    function pageListController($routeParams, sharedService, pageService) {
        var vm = this,
            uid,
            wid;

        (function init() {
            _parseRouteParams();
            _fetchTemplates();
            _initHeaderFooter();
            _loadContent();
        })();

        function _fetchTemplates() {
            vm.templates = Object.assign(
                sharedService.getTemplates(),
                pageService.getTemplates()
            );
        }

        function _initHeaderFooter() {
            vm.navHeader = {
                leftLink: {href: "#!/user/" + uid + "/website", iconClass: "glyphicon-triangle-left", name: "Websites"},
                name: "Pages"
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