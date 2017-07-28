(function() {
    angular
        .module("WamApp")
        .controller("widgetNewController", widgetNewController);

    function widgetNewController($routeParams, $location, widgetService) {
        var widgetOptions = [
            {widgetType: "HEADING", displayName: "Header"},
            {widgetType: "IMAGE", displayName: "Image"},
            {widgetType: "YOUTUBE", displayName: "YouTube"}
        ];

        var vm = this,
            uid, wid, pid;

        vm.createWidget = createWidget;

        (function init() {
            uid = $routeParams["uid"];
            vm.uid = uid;

            wid = $routeParams["wid"];
            vm.wid = wid;

            pid = $routeParams["pid"];
            vm.pid = pid;

            vm.widgetOptions = widgetOptions;
        })();

        function createWidget(widget) {
            widgetService
                .createWidget(pid, widget)
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
    }
})();