(function() {
    angular
        .module("WamApp")
        .controller("websiteListController", websiteListController);

    function websiteListController($routeParams, websiteService) {
        var vm = this,
            uid;

        (function init(){
            uid = $routeParams["uid"];
            vm.uid = uid;

            var findWebsitesRs = websiteService.findWebsitesByUser(uid);
            vm.websites = findWebsitesRs.websites;
        })();
    }
})();