module.exports = function (app) {
    var websites = [
            {_id: "123", name: "Facebook", developerId: "456", description: "Lorem"},
            {_id: "234", name: "Tweeter", developerId: "456", description: "Lorem"},
            {_id: "456", name: "Gizmodo", developerId: "456", description: "Lorem"},
            {_id: "890", name: "Go", developerId: "123", description: "Lorem"},
            {_id: "567", name: "Tic Tac Toe", developerId: "123", description: "Lorem"},
            {_id: "678", name: "Checkers", developerId: "123", description: "Lorem"},
            {_id: "789", name: "Chess", developerId: "234", description: "Lorem"}
        ],
        nextId = 666;

    app.get("/api/user/:userId/website", findWebsitesByUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.delete("/api/website/:websiteId", deleteWebsite);
    app.post("/api/user/:userId/website", createWebsite);
    app.put("/api/website/:websiteId", updateWebsite);

    function createWebsite(req, res) {
        var retObj = {},
            website = {
                name: req.query.name,
                developerId: req.params.userId,
                description: req.query.description
            };

        if (!(website.name && website.developerId)) {
            retObj.msg = "Website must have a name and a developer";
        }
        else {
            website._id = (nextId++).toString();
            websites.push(website);
            retObj.website = website;
        }

        res.json(retObj);
    }

    function deleteWebsite(req, res) {
        var retObj = {},
            websiteId = req.params.websiteId,
            foundFlag = false;

        for (var i = 0; i < websites.length && !foundFlag; i++) {
            if (websites[i]._id === websiteId) {
                foundFlag = true;
                websites.splice(i, 1);
            }
        }

        if (!foundFlag) {
            retObj.msg = "Website with id '" + websiteId + "' not found"
        }

        res.json(retObj);
    }

    function findWebsiteById(req, res) {
        var retObj = {},
            websiteId = req.params.websiteId;

        var website = _findWebsiteById(websiteId);

        retObj.website = website;
        retObj.msg = website ? null : "Website with id '" + websiteId + "' not found";

        res.json(retObj);
    }

    function findWebsitesByUser(req, res) {
        var retObj = {websites: []},
            userId = req.params.userId;

        for (var i = 0; i < websites.length; i++) {
            if (websites[i].developerId === userId) {
                retObj.websites.push(websites[i]);
            }
        }

        res.json(retObj);
    }

    function updateWebsite(req, res) {
        var retObj = {},
            websiteId = req.params.websiteId,
            newWebsiteInfo = {
                name: req.query.name,
                description: req.query.description
            };

        var website = _findWebsiteById(websiteId);

        if (website) {
            website.name = newWebsiteInfo.name || website.name; // not clearable yet
            website.description = newWebsiteInfo.description;
        } else {
            retObj.msg = "Website with id '" + websiteId + "' not found";
        }

        res.json(retObj);
    }

    function _findWebsiteById(websiteId) {
        var website = null;

        for (var i = 0; i < websites.length; i++) {
            if (websites[i]._id === websiteId) {
                website = websites[i];
                break;
            }
        }

        return website;
    }
};