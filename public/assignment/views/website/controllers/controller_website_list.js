(function () {
    angular
        .module("WamApp")
        .controller("websiteListController", websiteListController);

    function websiteListController($routeParams, sharedService, websiteService) {
        var vm = this,
            uid;

        (function init() {
            _parseRouteParams();
            _initHeaderFooter();
            _fetchTemplates();
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
                leftLink: {href: "#!/user/" + uid, iconClass: "glyphicon-triangle-left", name: "Profile"},
                name: "Websites"
            };
            vm.navFooter = [
                {href: "#!/user/" + uid, iconClass: "glyphicon-user", sizeClass: "col-xs-6"},
                {href: "#!/user/" + uid + "/website/new", iconClass: "glyphicon-plus", sizeClass: "col-xs-6"}
            ];
        }

        function _loadContent() {
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
    }
})();