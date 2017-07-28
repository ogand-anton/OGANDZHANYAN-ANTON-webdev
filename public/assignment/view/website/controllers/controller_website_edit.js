(function () {
    angular
        .module("WamApp")
        .controller("websiteEditController", websiteEditController);

    function websiteEditController($routeParams, $location, websiteService) {
        var vm = this,
            uid,
            wid;

        vm.deleteWebsite = deleteWebsite;
        vm.getWebsiteListGroupTemplateUrl = getWebsiteListGroupTemplateUrl;
        vm.saveWebsite = saveWebsite;

        (function init() {
            uid = $routeParams["uid"];
            vm.uid = uid;

            wid = $routeParams["wid"];
            vm.wid = wid;

            websiteService
                .findWebsitesByUser(uid)
                .then(function (res) {
                    vm.websites = res.websites;
                });

            websiteService
                .findWebsiteById(wid)
                .then(function (res) {
                    vm.errorMsg = res.msg;
                    vm.websiteInfo = res.website;
                });
        })();

        function deleteWebsite() {
            websiteService
                .deleteWebsite(wid)
                .then(function (res) {
                    if (res.msg) {
                        vm.errorMsg = res.msg;
                    } else {
                        $location.url("/user/" + uid + "/website");
                    }
                });
        }

        function getWebsiteListGroupTemplateUrl() {
            return "view/website/templates/template_website_list_group.html";
        }

        function saveWebsite(websiteInfo) {
            websiteService
                .updateWebsite(wid, websiteInfo)
                .then(function (res) {
                    vm.errorMsg = res.msg;
                    vm.successMsg = res.msg ? null : "Website updated";
                });
        }
    }
})();