(function() {
    angular
        .module("WamApp")
        .controller("websiteListController", websiteListController);

    function websiteListController($routeParams, websiteService) {
        var vm = this,
            uid;

        vm.getWebsiteListGroupTemplateUrl = getWebsiteListGroupTemplateUrl;

        (function init(){
            uid = $routeParams["uid"];
            vm.uid = uid;

            var findWebsitesRs = websiteService.findWebsitesByUser(uid);
            vm.websites = findWebsitesRs.websites;
        })();

        function getWebsiteListGroupTemplateUrl() {
            return "view/website/templates/template_website_list_group.html";
        }
    }
})();