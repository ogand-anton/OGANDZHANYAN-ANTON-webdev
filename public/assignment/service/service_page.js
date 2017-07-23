(function() {
    angular
        .module("WamApp")
        .factory("pageService", pageService);

    function pageService() {
        var lastId = "543";
        var pages = [
            { _id: "321", name: "Post 1", websiteId: "456", description: "Lorem" },
            { _id: "432", name: "Post 2", websiteId: "456", description: "Lorem" },
            { _id: "543", name: "Post 3", websiteId: "456", description: "Lorem" },
            { _id: "999", name: "Post 1", websiteId: "567", description: "Lorem" },
            { _id: "998", name: "Post 2", websiteId: "567", description: "Lorem" },
            { _id: "997", name: "Post 3", websiteId: "567", description: "Lorem" }
        ];

        return {
            createPage: createPage,
            deletePage: deletePage,
            findPageById: findPageById,
            findPagesByWebsiteId: findPagesByWebsiteId,
            updatePage: updatePage
        };

        function createPage(websiteId, page) {
            var response = {};

            if (!page || !page.name) {
                response.msg = "Page must have a name";
            }
            else if (!websiteId) {
                response.msg = "Website ID not specified";
            }
            else {
                lastId += "1"; // DB will take care of this automatically
                var newPage = {
                    _id: lastId,
                    name: page.name,
                    description: page.description,
                    websiteId: websiteId
                };
                pages.push(newPage);
                response.page = newPage;
            }

            return response;
        }

        function deletePage(pageId) {
            var response = {},
                foundFlag = false;

            for (var i = 0; i < pages.length && !foundFlag; i++) {
                if (pages[i]._id === pageId) {
                    foundFlag = true;
                    pages.splice(i, 1);
                }
            }

            if (!foundFlag) {
                response.msg = "Page with id '" + pageId + "' not found"
            }

            return response;
        }

        function findPageById(pageId){
            var response = {},
                foundFlag = false;

            for (var i = 0; i < pages.length && !foundFlag; i++) {
                if (pages[i]._id === pageId) {
                    foundFlag = true;
                    response.page = pages[i];
                }
            }

            if (!foundFlag) {
                response.msg = "Page with id '" + pageId + "' not found"
            }

            return response;
        }

        function findPagesByWebsiteId(websiteId) {
            var response = {pages: []};

            for (var i = 0; i < pages.length; i++) {
                if (pages[i].websiteId === websiteId) {
                    response.pages.push(pages[i]);
                }
            }

            return response;
        }

        function updatePage(pageId, page) {
            var response = {};

            if (!page || !page.name) {
                response.msg = "Cannot clear page name";
            }
            else {
                var foundFlag = false;

                for (var i = 0; i < pages.length && !foundFlag; i++) {
                    if (pages[i]._id === pageId) {
                        foundFlag = true;
                        pages[i].name = page.name;
                        pages[i].description = page.description;
                    }
                }

                if (!foundFlag) {
                    response.msg = "Page with id '" + pageId + "' not found"
                }
            }

            return response;
        }
    }
})();