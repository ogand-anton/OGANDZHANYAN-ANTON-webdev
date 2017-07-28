(function () {
    angular
        .module("WamApp")
        .controller("pageNewController", pageNewController);

    function pageNewController($routeParams, $location, pageService) {
        var vm = this,
            uid,
            wid;

        vm.getPageListGroupTemplateUrl = getPageListGroupTemplateUrl;
        vm.savePage = savePage;

        (function init() {
            uid = $routeParams["uid"];
            vm.uid = uid;

            wid = $routeParams["wid"];
            vm.wid = wid;

            pageService
                .findPagesByWebsiteId(wid)
                .then(function (res) {
                    vm.pages = res.pages;
                });
        })();

        function getPageListGroupTemplateUrl() {
            return "view/page/templates/template_page_list_group.html";
        }

        function savePage(pageInfo) {
            pageService
                .createPage(wid, pageInfo || {})
                .then(function (res) {
                    if (res.msg) {
                        vm.errorMsg = res.msg;
                    } else {
                        $location.url("/user/" + uid + "/website/" + wid + "/page");
                    }
                });
        }
    }
})();