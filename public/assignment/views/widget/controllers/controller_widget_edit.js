(function () {
    angular
        .module("WamApp")
        .controller("widgetEditController", widgetEditController);

    function widgetEditController($routeParams, $location, widgetService) {
        var vm = this,
            uid, wid, pid, wgid;

        vm.deleteWidget = deleteWidget;
        vm.saveWidget = saveWidget;

        (function inti() {
            uid = $routeParams["uid"];
            vm.uid = uid;

            wid = $routeParams["wid"];
            vm.wid = wid;

            pid = $routeParams["pid"];
            vm.pid = pid;

            wgid = $routeParams["wgid"];
            vm.wgid = wgid;

            widgetService
                .findWidgetById(wgid)
                .then(function (res) {
                    vm.errorMsg = res.msg;
                    vm.widgetInfo = res.widget;
                    vm.widgetTemplateUrl = _getWidgetTemplateUrl(res.widget)
                })
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

        function saveWidget(widgetInfo) {
            widgetService
                .updateWidget(wgid, widgetInfo)
                .then(function (res) {
                    vm.errorMsg = res.msg;
                    vm.successMsg = res.msg ? null : "Widget Updated";
                });
        }

        function _getWidgetTemplateUrl(widget) {
            var widgetTemplateUrl = null;

            if (widget) {
                widgetTemplateUrl = "views/widget/templates/template_widget_edit_";
                switch (widget.widgetType) {
                    case "HEADING":
                        widgetTemplateUrl += "header.html";
                        break;
                    case "IMAGE":
                        widgetTemplateUrl += "image.html";
                        break;
                    case "YOUTUBE":
                        widgetTemplateUrl += "youtube.html";
                        break;
                    default :
                        widgetTemplateUrl = null;
                }
            }

            return widgetTemplateUrl;
        }
    }
})();