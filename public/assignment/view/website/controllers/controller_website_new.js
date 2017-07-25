(function() {
    angular
        .module("WamApp")
        .controller("websiteNewController", websiteNewController);

    function websiteNewController($routeParams, $location, websiteService) {
        var vm = this,
            uid;

        vm.getWebsiteListGroupTemplateUrl = getWebsiteListGroupTemplateUrl;
        vm.saveWebsite = saveWebsite;

        (function init() {
            uid = $routeParams["uid"];
            vm.uid = uid;

            var findWebsitesRs = websiteService.findWebsitesByUser(uid);
            vm.websites = findWebsitesRs.websites;
        })();

        function getWebsiteListGroupTemplateUrl() {
            return "view/website/templates/template_website_list_group.html";
        }

        function saveWebsite(websiteInfo) {
            websiteInfo = websiteInfo || {};
            var createWebsiteRs = websiteService.createWebsite(uid, websiteInfo);

            if (createWebsiteRs.msg){
                vm.errorMsg = createWebsiteRs.msg;
            } else {
                $location.url("/user/" + uid + "/website");
            }
        }
    }
})();