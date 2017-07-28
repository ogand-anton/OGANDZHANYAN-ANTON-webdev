(function() {
    angular
        .module("WamApp")
        .controller("pageListController", pageListController);

    function pageListController($routeParams, pageService) {
        var vm = this,
            uid,
            wid;

        vm.getPageListGroupTemplateUrl = getPageListGroupTemplateUrl;

        (function init(){
            uid = $routeParams["uid"];
            vm.uid = uid;

            wid = $routeParams["wid"];
            vm.wid = wid;

            pageService
                .findPagesByWebsiteId(wid)
                .then(function(res){
                    vm.pages = res.pages;
                });
        })();

        function getPageListGroupTemplateUrl() {
            return "views/page/templates/template_page_list_group.html";
        }
    }
})();