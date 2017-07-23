(function() {
    angular
        .module("WamApp")
        .controller("pageListController", pageListController);

    function pageListController($routeParams, pageService) {
        var vm = this,
            uid,
            wid;

        (function init(){
            uid = $routeParams["uid"];
            vm.uid = uid;

            wid = $routeParams["wid"];
            vm.wid = wid;

            var findPagesRs = pageService.findPagesByWebsiteId(wid);
            vm.pages = findPagesRs.pages;
        })();
    }
})();