(function() {
    angular
        .module("WamApp")
        .controller("widgetListController", widgetListController);

    function widgetListController($routeParams, $sce, widgetService) {
        var vm = this,
            uid, wid, pid;

        vm.getWidgetTemplateUrl = getWidgetTemplateUrl;
        vm.trustYouTubeUrlResource = trustYouTubeUrlResource;

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

        function getWidgetTemplateUrl(widgetType) {
            var widgetTemplateUrl = "view/widget/templates/template_widget_list_";
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

        function trustYouTubeUrlResource(url){
            var youtubeUrl = "https://www.youtube.com/embed/";
            var urlParts = url.split("/");
            youtubeUrl += urlParts[urlParts.length - 1];
            return $sce.trustAsResourceUrl(youtubeUrl);
        }
    }
})();