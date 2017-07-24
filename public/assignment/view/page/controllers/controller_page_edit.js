(function() {
    angular
        .module("WamApp")
        .controller("pageEditController", pageEditController);

    function pageEditController($routeParams, $location, pageService) {
        var vm = this,
            uid, wid, pid;

        vm.deletePage = deletePage;
        vm.savePage = savePage;

        (function init(){
            uid = $routeParams["uid"];
            vm.uid = uid;

            wid = $routeParams["wid"];
            vm.wid = wid;

            pid = $routeParams["pid"];
            vm.pid = pid;

            var findPagesRs = pageService.findPagesByWebsiteId(wid);
            vm.pages = findPagesRs.pages;

            var findPageRs = pageService.findPageById(pid);
            if (findPageRs.msg) {
                vm.errorMsg = findPageRs.msg;
            } else {
                vm.pageInfo = findPageRs.page;
            }
        })();

        function deletePage() {
            var deletePageRs = pageService.deletePage(pid);

            if (deletePageRs.msg) {
                vm.errorMsg = deletePageRs.msg;
            } else {
                $location.url("/user/" + uid + "/website/" + wid + "/page");
            }
        }

        function savePage(pageInfo) {
            var updatePageRs = pageService.updatePage(pid, pageInfo);

            if (updatePageRs.msg){
                vm.errorMsg = updatePageRs.msg;
                vm.successMsg = null;
            } else {
                vm.errorMsg = null;
                vm.successMsg = "Page updated";
            }
        }
    }
})();