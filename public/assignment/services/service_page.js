(function () {
    angular
        .module("WamApp")
        .factory("pageService", pageService);

    function pageService($http) {
        var templates = {
            pageListGroup: "views/page/templates/template_page_list_group.html"
        };

        return {
            createPage: createPage,
            deletePage: deletePage,
            findPageById: findPageById,
            findPagesByWebsiteId: findPagesByWebsiteId,
            getTemplates: getTemplates,
            updatePage: updatePage
        };

        function createPage(websiteId, page) {
            return $http({
                url: "/api/website/" + websiteId + "/page",
                method: "POST",
                params: page
            }).then(function (res) {
                return res.data;
            });
        }

        function deletePage(pageId) {
            return $http({
                url: "/api/page/" + pageId,
                method: "DELETE"
            }).then(function (res) {
                return res.data;
            });
        }

        function findPageById(pageId) {
            return $http({
                url: "/api/page/" + pageId,
                method: "GET"
            }).then(function (res) {
                return res.data;
            });
        }

        function findPagesByWebsiteId(websiteId) {
            return $http({
                url: "/api/website/" + websiteId + "/page",
                method: "GET"
            }).then(function (res) {
                return res.data;
            });
        }

        function getTemplates() {
            return templates;
        }

        function updatePage(pageId, page) {
            return $http({
                url: "/api/page/" + pageId,
                method: "PUT",
                params: page
            }).then(function (res) {
                return res.data;
            });
        }
    }
})();