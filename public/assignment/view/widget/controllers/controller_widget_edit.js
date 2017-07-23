(function() {
    angular
        .module("WamApp")
        .controller("widgetEditController", widgetEditController);

    function widgetEditController($routeParams, $location, widgetService) {
        var vm = this,
            uid, wid, pid, wgid;

        vm.deleteWidget = deleteWidget;
        vm.saveWidget = saveWidget;

        (function inti(){
            uid = $routeParams["uid"];
            vm.uid = uid;

            wid = $routeParams["wid"];
            vm.wid = wid;

            pid = $routeParams["pid"];
            vm.pid = pid;

            wgid = $routeParams["wgid"];
            vm.wgid = wgid;

            var findWidgetRs = widgetService.findWidgetById(wgid);

            if (findWidgetRs.msg) {
                vm.errorMsg = findWidgetRs.msg;
            } else {
                vm.text = findWidgetRs.widget.text;
                vm.url = findWidgetRs.widget.url;
                vm.width = findWidgetRs.widget.width;
                vm.widgetType = findWidgetRs.widget.widgetType;
            }
        })();

        function deleteWidget(){
            var deleteWidgetRs = widgetService.deleteWidget(wgid);

            if (deleteWidgetRs.msg) {
                vm.errorMsg = deleteWidgetRs.msg;
            } else {
                $location.url("/user/" + uid + "/website/" + wid + "/page/" + pid + "/widget");
            }
        }

        function saveWidget(widgetInfo) {
            var saveWidgetRs = widgetService.updateWidget(wgid, widgetInfo);

            if (saveWidgetRs.msg){
                vm.errorMsg = saveWidgetRs.msg;
                vm.successMsg = null;
            } else {
                vm.errorMsg = null;
                vm.successMsg = "Widget updated";
            }
        }
    }
})();