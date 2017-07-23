(function() {
    angular
        .module("WamApp")
        .controller("websiteEditController", websiteEditController);

    function websiteEditController($routeParams, $location, websiteService) {
        var vm = this,
            uid,
            wid;

        vm.deleteWebsite = deleteWebsite;
        vm.saveWebsite = saveWebsite;

        (function init(){
            uid = $routeParams["uid"];
            vm.uid = uid;

            wid = $routeParams["wid"];
            vm.wid = wid;

            var findWebsitesRs = websiteService.findWebsitesByUser(uid);
            vm.websites = findWebsitesRs.websites;

            var findWebsiteRs = websiteService.findWebsiteById(wid);
            if (findWebsiteRs.msg) {
                vm.errorMsg = findWebsiteRs.msg;
            } else {
                vm.name = findWebsiteRs.website.name;
                vm.description = findWebsiteRs.website.description;
            }
        })();

        function deleteWebsite() {
            var deleteWebsiteRs = websiteService.deleteWebsite(wid);

            if (deleteWebsiteRs.msg) {
                vm.errorMsg = deleteWebsiteRs.msg;
            } else {
                $location.url("/user/" + uid + "/website");
            }
        }

        function saveWebsite(websiteInfo) {
            var updateWebsiteRs = websiteService.updateWebsite(wid, websiteInfo);

            if (updateWebsiteRs.msg){
                vm.errorMsg = updateWebsiteRs.msg;
                vm.successMsg = null;
            } else {
                vm.errorMsg = null;
                vm.successMsg = "Website updated";
            }
        }
    }
})();