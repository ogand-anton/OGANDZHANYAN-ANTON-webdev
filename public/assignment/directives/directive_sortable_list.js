(function () {
    angular
        .module("sortableListDirective", [])
        .directive("sortList", sortableListDirective);

    function sortableListDirective() {
        return {
            link: _makeSortable,
            scope: {startDragCb: "&", stopDragCb: "&"}
        };

        function _makeSortable(scope, $elem) {
            $elem
                .find("ul")
                .sortable({
                    start: function (event, ui) {scope.startDragCb({event: event, ui:ui})},
                    stop: function (event, ui) {scope.stopDragCb({event: event, ui: ui})}
                });
        }
    }
})();