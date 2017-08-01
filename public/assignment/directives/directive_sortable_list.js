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
                .sortable({start: scope.startDragCb, stop: scope.stopDragCb});
        }
    }
})();