(function() {
    angular
        .module("WamApp")
        .factory("websiteService", websiteService);

    function websiteService() {
        var lastId = "890";
        var websites = [
            { _id: "123", name: "Facebook", developerId: "456", description: "Lorem" },
            { _id: "234", name: "Tweeter", developerId: "456", description: "Lorem" },
            { _id: "456", name: "Gizmodo", developerId: "456", description: "Lorem" },
            { _id: "890", name: "Go", developerId: "123", description: "Lorem" },
            { _id: "567", name: "Tic Tac Toe", developerId: "123", description: "Lorem" },
            { _id: "678", name: "Checkers", developerId: "123", description: "Lorem" },
            { _id: "789", name: "Chess", developerId: "234", description: "Lorem" }
        ];

        return {
            createWebsite: createWebsite,
            deleteWebsite: deleteWebsite,
            findWebsiteById: findWebsiteById,
            findWebsitesByUser: findWebsitesByUser,
            updateWebsite: updateWebsite
        };

        function createWebsite(userId, website) {
            var response = {};

            if (!website || !website.name) {
                response.msg = "Website must have a name";
            }
            else if (!userId) {
                response.msg = "Developer ID not specified";
            }
            else {
                lastId += "1"; // DB will take care of this automatically
                var newWebsite = {
                  _id: lastId,
                  name: website.name,
                  developerId: userId,
                  description: website.description
                };
                websites.push(newWebsite);
                response.website = newWebsite;
            }

            return response;
        }

        function deleteWebsite(websiteId) {
            var response = {},
                foundFlag = false;

            for (var i = 0; i < websites.length && !foundFlag; i++) {
                if (websites[i]._id === websiteId) {
                    foundFlag = true;
                    websites.splice(i, 1);
                }
            }

            if (!foundFlag) {
                response.msg = "Website with id '" + websiteId + "' not found"
            }

            return response;
        }

        function findWebsiteById(websiteId){
            var response = {},
                foundFlag = false;

            for (var i = 0; i < websites.length && !foundFlag; i++) {
                if (websites[i]._id === websiteId) {
                    foundFlag = true;
                    response.website = websites[i];
                }
            }

            if (!foundFlag) {
                response.msg = "Website with id '" + websiteId + "' not found"
            }

            return response;
        }

        function findWebsitesByUser(userId) {
            var response = {websites: []};

            for (var i = 0; i < websites.length; i++) {
                if (websites[i].developerId === userId) {
                    response.websites.push(websites[i]);
                }
            }

            return response;
        }

        function updateWebsite(websiteId, website) {
            var response = {};

            if (!website || !website.name) {
                response.msg = "Cannot clear website name";
            }
            else {
                var foundFlag = false;

                for (var i = 0; i < websites.length && !foundFlag; i++) {
                    if (websites[i]._id === websiteId) {
                        foundFlag = true;
                        websites[i].name = website.name;
                        websites[i].description = website.description;
                    }
                }

                if (!foundFlag) {
                    response.msg = "Website with id '" + websiteId + "' not found"
                }
            }

            return response;
        }
    }
})();