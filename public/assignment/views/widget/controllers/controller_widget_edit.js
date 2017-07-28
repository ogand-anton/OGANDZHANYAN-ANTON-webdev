(function () {
    angular
        .module("WamApp")
        .controller("widgetEditController", widgetEditController);

    function widgetEditController($routeParams, $location, sharedService, widgetService) {
        var vm = this,
            uid, wid, pid, wgid;

        vm.deleteWidget = deleteWidget;
        vm.saveWidget = saveWidget;

        (function inti() {
            _parseRouteParams();
            _fetchTemplates();
            _initHeaderFooter();
            _loadContent();
        })();

        function deleteWidget() {
            widgetService
                .deleteWidget(wgid)
                .then(function (res) {
                    if (res.msg) {
                        vm.errorMsg = res.msg;
                    } else {
                        $location.url("/user/" + uid + "/website/" + wid + "/page/" + pid + "/widget");
                    }
                });
        }

        function saveWidget() {
            widgetService
                .updateWidget(wgid, vm.widgetInfo)
                .then(function (res) {
                    vm.errorMsg = res.msg;
                    vm.successMsg = res.msg ? null : "Widget Updated";
                });
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
                    href: "#!/user/" + uid + "/website/" + wid + "/page/" + pid + "/widget",
                    iconClass: "glyphicon-triangle-left",
                    name: "Widgets"
                },
                name: "Edit Widget",
                rightLink: {
                    clickCb: saveWidget,
                    href: "javascript:void(0)",
                    iconClass: "glyphicon-floppy-save",
                    name: "Save"
                }
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
                .findWidgetById(wgid)
                .then(function (res) {
                    vm.errorMsg = res.msg;
                    vm.widgetInfo = res.widget;
                })
        }

        function _parseRouteParams() {
            uid = $routeParams["uid"];
            vm.uid = uid;

            wid = $routeParams["wid"];
            vm.wid = wid;

            pid = $routeParams["pid"];
            vm.pid = pid;

            wgid = $routeParams["wgid"];
            vm.wgid = wgid;
        }
    }
})();