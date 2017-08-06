(function () {
    angular
        .module("WamApp")
        .controller("widgetListController", widgetListController);

    function widgetListController($routeParams, $sce, sharedService, widgetService) {
        var vm = this,
            uid, wid, pid,
            draggedWidgetIndex; // only populated during drag

        vm.startDragCb = startDragCb;
        vm.stopDragCb = stopDragCb;
        vm.trustYouTubeUrlResource = trustYouTubeUrlResource;

        (function init() {
            _parseRouteParams();
            _fetchTemplates();
            _initHeaderFooter();
            _loadContent();
        })();

        function startDragCb(event, ui) {
            draggedWidgetIndex = $(ui.item).index();
        }

        function stopDragCb(event, ui) {
            var finalIndex = $(ui.item).index();
            widgetService.reorderWidget(pid, vm.widgets[draggedWidgetIndex]._id, finalIndex);
            vm.widgets.splice(finalIndex, 0, vm.widgets.splice(draggedWidgetIndex, 1)[0]);
            draggedWidgetIndex = undefined;
        }

        function trustYouTubeUrlResource(url) {
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