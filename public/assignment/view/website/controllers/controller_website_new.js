(function () {
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

            websiteService
                .findWebsitesByUser(uid)
                .then(function (res) {
                    vm.websites = res.websites;
                });
        })();

        function getWebsiteListGroupTemplateUrl() {
            return "view/website/templates/template_website_list_group.html";
        }

        function saveWebsite(websiteInfo) {
            websiteInfo = websiteInfo || {};
            websiteService
                .createWebsite(uid, websiteInfo)
                .then(function (res) {
                    if (res.msg) {
                        vm.errorMsg = res.msg;
                    } else {
                        $location.url("/user/" + uid + "/website");
                    }
                });
        }
    }
})();