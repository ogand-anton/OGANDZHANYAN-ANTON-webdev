(function() {
    angular
        .module("WamApp")
        .factory("widgetService", widgetService);

    function widgetService($http) {
        return {
            createWidget: createWidget,
            deleteWidget: deleteWidget,
            findWidgetById: findWidgetById,
            findWidgetsByPageId: findWidgetsByPageId,
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

        function findWidgetById(widgetId){
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

        function updateWidget(widgetId, widget) {
            return $http({
                url: "/api/widget/" + widgetId,
                method: "PUT",
                params: widget
            }).then(function (res) {
                return res.data;
            });
        }
    }
})();