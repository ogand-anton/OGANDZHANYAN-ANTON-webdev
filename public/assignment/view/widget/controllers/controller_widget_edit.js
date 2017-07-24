(function() {
    angular
        .module("WamApp")
        .controller("widgetEditController", widgetEditController);

    function widgetEditController($routeParams, $location, widgetService) {
        var vm = this,
            uid, wid, pid, wgid;

        vm.deleteWidget = deleteWidget;
        vm.getWidgetTemplateUrl = getWidgetTemplateUrl;
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
                vm.widgetInfo = findWidgetRs.widget;
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

        function getWidgetTemplateUrl(widgetType) {
            var widgetTemplateUrl = "view/widget/templates/template_widget_edit_";
            switch(widgetType){
                case "HEADING":
                    widgetTemplateUrl += "header";
                    break;
                case "IMAGE":
                    widgetTemplateUrl += "image";
                    break;
                case "YOUTUBE":
                    widgetTemplateUrl += "youtube";
                    break;
            }
            widgetTemplateUrl += ".html";
            return widgetTemplateUrl;
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