(function () {
    angular
        .module("WamApp")
        .factory("widgetService", widgetService);

    function widgetService($http) {
        var templates = {
            editHEADING: "views/widget/templates/template_widget_edit_header.html",
            editIMAGE: "views/widget/templates/template_widget_edit_image.html",
            editYOUTUBE: "views/widget/templates/template_widget_edit_youtube.html",
            listHEADING: "views/widget/templates/template_widget_list_header.html",
            listIMAGE: "views/widget/templates/template_widget_list_image.html",
            listYOUTUBE: "views/widget/templates/template_widget_list_youtube.html",
            widgetListGroup: "views/widget/templates/template_widget_list_group.html"
        };

        return {
            createWidget: createWidget,
            deleteWidget: deleteWidget,
            findWidgetById: findWidgetById,
            findWidgetsByPageId: findWidgetsByPageId,
            getTemplates: getTemplates,
            reorderWidget: reorderWidget,
            updateWidget: updateWidget
        };

        function createWidget(pageId, widget) {
            return $http({
                url: "/api/page/" + pageId + "/widget",
                method: "POST",
                params: widget
            }).then(function (res) {
                return res.data;
            });
        }

        function deleteWidget(widgetId) {
            return $http({
                url: "/api/widget/" + widgetId,
                method: "DELETE"
            }).then(function (res) {
                return res.data;
            });
        }

        function findWidgetById(widgetId) {
            return $http({
                url: "/api/widget/" + widgetId,
                method: "GET"
            }).then(function (res) {
                return res.data;
            });
        }

        function findWidgetsByPageId(pageId) {
            return $http({
                url: "/api/page/" + pageId + "/widget",
                method: "GET"
            }).then(function (res) {
                return res.data;
            });
        }

        function getTemplates() {
            return templates;
        }

        function reorderWidget(pageId, widgetId, sortIndex){
            return $http.put("/api/page/" + pageId + "/widget", {widgetId: widgetId, sortIndex: sortIndex});
        }

        function updateWidget(widgetId, widget) {
            return $http
                .put("/api/widget/" + widgetId, widget)
                .then(function(res){return res.data});
        }
    }
})();