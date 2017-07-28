(function () {
    angular
        .module("WamApp")
        .factory("websiteService", websiteService);

    function websiteService($http) {
        var templates = {
            websiteListGroup: "views/website/templates/template_website_list_group.html"
        };

        return {
            createWebsite: createWebsite,
            deleteWebsite: deleteWebsite,
            findWebsiteById: findWebsiteById,
            findWebsitesByUser: findWebsitesByUser,
            getTemplates: getTemplates,
            updateWebsite: updateWebsite
        };

        function createWebsite(userId, website) {
            return $http({
                url: "/api/user/" + userId + "/website",
                method: "POST",
                params: website
            }).then(function (res) {
                return res.data;
            });
        }

        function deleteWebsite(websiteId) {
            return $http({
                url: "/api/website/" + websiteId,
                method: "DELETE"
            }).then(function (res) {
                return res.data;
            });
        }

        function findWebsiteById(websiteId) {
            return $http({
                url: "/api/website/" + websiteId,
                method: "GET"
            }).then(function (res) {
                return res.data;
            });
        }

        function findWebsitesByUser(userId) {
            return $http({
                url: "/api/user/" + userId + "/website",
                method: "GET"
            }).then(function (res) {
                return res.data;
            });
        }

        function getTemplates() {
            return templates;
        }

        function updateWebsite(websiteId, website) {
            return $http({
                url: "/api/website/" + websiteId,
                method: "PUT",
                params: website
            }).then(function (res) {
                return res.data;
            });
        }
    }
})();