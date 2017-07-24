(function() {
    angular
        .module("WamApp")
        .controller("pageNewController", pageNewController);

    function pageNewController($routeParams, $location, pageService) {
        var vm = this,
            uid,
            wid;

        vm.savePage = savePage;

        (function init() {
            uid = $routeParams["uid"];
            vm.uid = uid;

            wid = $routeParams["wid"];
            vm.wid = wid;

            var findPagesRs = pageService.findPagesByWebsiteId(wid);
            vm.pages = findPagesRs.pages;
        })();

        function savePage(pageInfo) {
            pageInfo = pageInfo || {};
            var createPageRs = pageService.createPage(wid, pageInfo);

            if (createPageRs.msg){
                vm.errorMsg = createPageRs.msg;
            } else {
                $location.url("/user/" + uid + "/website/" + wid + "/page");
            }
        }
    }
})();