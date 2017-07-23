(function() {
    angular
        .module("WamApp")
        .controller("widgetListController", widgetListController);

    function widgetListController($routeParams, widgetService) {
        var vm = this,
            uid, wid, pid;

        (function init() {
            uid = $routeParams["uid"];
            vm.uid = uid;

            wid = $routeParams["wid"];
            vm.wid = wid;

            pid = $routeParams["pid"];
            vm.pid = pid;

            var findWidgetsRs = widgetService.findWidgetsByPageId(pid);
            vm.widgets = findWidgetsRs.widgets;
        })();
    }
})();