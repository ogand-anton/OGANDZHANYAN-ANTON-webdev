(function() {
    angular
        .module("WamApp")
        .controller("widgetListController", widgetListController);

    function widgetListController($routeParams, $sce, sharedService, widgetService) {
        var vm = this,
            uid, wid, pid;

        vm.startDragCb = startDragCb;
        vm.stopDragCb = stopDragCb;
        vm.trustYouTubeUrlResource = trustYouTubeUrlResource;

        (function init() {
            _parseRouteParams();
            _fetchTemplates();
            _initHeaderFooter();
            _loadContent();
        })();

        function startDragCb() {
            console.log("START");
        }

        function stopDragCb() {
            console.log("STOP");
        }

        function trustYouTubeUrlResource(url){
            var youtubeUrl = "https://www.youtube.com/embed/";
            var urlParts = url.split("/");
            youtubeUrl += urlParts[urlParts.length - 1];
            return $sce.trustAsResourceUrl(youtubeUrl);
        }

        function _fetchTemplates() {
            vm.templates = Object.assign(
                sharedService.getTemplates(),
                widgetService.getTemplates()
            );
        }

        function _initHeaderFooter() {
            vm.navHeader = {
                leftLink: {
                    href: "#!/user/" + uid + "/website/" + wid + "/page",
                    iconClass: "glyphicon-triangle-left",
                    name: "Pages"
                },
                name: "Widgets"
            };
            vm.navFooter = [
                {href: "#!/user/" + uid, iconClass: "glyphicon-user", sizeClass: "col-xs-6"},
                {
                    href: "#!/user/" + uid + "/website/" + wid + "/page/" + pid + "/widget/new",
                    iconClass: "glyphicon-plus",
                    sizeClass: "col-xs-6"
                }
            ];
        }

        function _loadContent() {
            widgetService
                .findWidgetsByPageId(pid)
                .then(function (res) {
                    vm.widgets = res.widgets;
                });
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