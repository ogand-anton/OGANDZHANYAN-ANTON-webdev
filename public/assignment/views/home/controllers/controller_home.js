(function () {
    angular
        .module("WamApp")
        .controller("homeController", homeController);

    function homeController(sharedService) {
        var vm = this;

        (function init() {
            _fetchTemplates();
            _initHeaderFooter();
        })();

        function _fetchTemplates() {
            vm.templates = sharedService.getTemplates();
        }

        function _initHeaderFooter() {
            vm.navHeader = {
                leftLink: {href: "../test/index.html", iconClass: "glyphicon-tower", name: "Test Mongo"},
                name: "WAM App",
                rightLink: {href: "#!/login", iconClass: "glyphicon-log-in", name: "Login"}
            };
        }
    }
})();