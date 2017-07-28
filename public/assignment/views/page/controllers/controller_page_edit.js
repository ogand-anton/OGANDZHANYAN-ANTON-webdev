(function () {
    angular
        .module("WamApp")
        .controller("pageEditController", pageEditController);

    function pageEditController($routeParams, $location, pageService) {
        var vm = this,
            uid, wid, pid;

        vm.deletePage = deletePage;
        vm.getPageListGroupTemplateUrl = getPageListGroupTemplateUrl;
        vm.savePage = savePage;

        (function init() {
            uid = $routeParams["uid"];
            vm.uid = uid;

            wid = $routeParams["wid"];
            vm.wid = wid;

            pid = $routeParams["pid"];
            vm.pid = pid;

            _getPageList();

            pageService
                .findPageById(pid)
                .then(function(res){
                    vm.errorMsg = res.msg;
                    vm.pageInfo = res.page;
            })
        })();

        function deletePage() {
            pageService
                .deletePage(pid)
                .then(function(res){
                    if (res.msg) {
                        vm.errorMsg = res.msg;
                    } else {
                        $location.url("/user/" + uid + "/website/" + wid + "/page");
                    }
                });
        }

        function getPageListGroupTemplateUrl() {
            return "views/page/templates/template_page_list_group.html";
        }

        function savePage(pageInfo) {
           pageService
               .updatePage(pid, pageInfo)
               .then(function(res){
                   vm.errorMsg = res.msg;
                   vm.successMsg = res.msg ? null : "Page Updated";

                   _getPageList();
               });
        }

        function _getPageList() {
            pageService
                .findPagesByWebsiteId(wid)
                .then(function (res) {
                    vm.pages = res.pages;
                });
        }
    }
})();