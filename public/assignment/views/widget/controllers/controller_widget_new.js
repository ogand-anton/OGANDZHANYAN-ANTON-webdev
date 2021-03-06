(function() {
    angular
        .module("WamApp")
        .controller("widgetNewController", widgetNewController);

    function widgetNewController($routeParams, $location, sharedService, widgetService) {
        var widgetOptions = [
            {widgetType: "HEADING", displayName: "Header"},
            {widgetType: "HTML", displayName: "HTML"},
            {widgetType: "IMAGE", displayName: "Image"},
            {widgetType: "TEXT", displayName: "Text Input"},
            {widgetType: "YOUTUBE", displayName: "YouTube"}
        ];

        var vm = this,
            uid, wid, pid;

        vm.createWidget = createWidget;

        (function init() {
            _parseRouteParams();
            _fetchTemplates();
            _initHeaderFooter();
            _loadContent();
        })();

        function createWidget(widget) {
            widgetService
                .createWidget(pid, {widgetType: widget.widgetType})
                .then(function(res){
                    if (res.msg) {
                        vm.errorMsg = res.msg;
                    } else {
                        $location.url(
                            "/user/" + uid +
                            "/website/" + wid +
                            "/page/" + pid +
                            "/widget/" + res.widget._id
                        );
                    }
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
                name: "New Widget"
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
            vm.widgetOptions = widgetOptions;
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