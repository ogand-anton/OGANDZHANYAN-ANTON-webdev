(function () {
    angular
        .module("WamApp")
        .factory("websiteService", websiteService);

    function websiteService($http) {
        return {
            createWebsite: createWebsite,
            deleteWebsite: deleteWebsite,
            findWebsiteById: findWebsiteById,
            findWebsitesByUser: findWebsitesByUser,
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