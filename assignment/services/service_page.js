module.exports = function (app) {
    var pages = [
            {_id: "321", name: "Post 1", websiteId: "456", description: "Lorem"},
            {_id: "432", name: "Post 2", websiteId: "456", description: "Lorem"},
            {_id: "543", name: "Post 3", websiteId: "456", description: "Lorem"},
            {_id: "999", name: "Post 1", websiteId: "567", description: "Lorem"},
            {_id: "998", name: "Post 2", websiteId: "567", description: "Lorem"},
            {_id: "997", name: "Post 3", websiteId: "567", description: "Lorem"}
        ],
        nextId = 666;

    app.get("/api/page/:pageId", findPageById);
    app.get("/api/website/:websiteId/page", findPagesByWebsiteId);
    app.delete("/api/page/:pageId", deletePage);
    app.post("/api/website/:websiteId/page", createPage);
    app.put("/api/page/:pageId", updatePage);

    function createPage(req, res) {
        var retObj = {},
            page = {
                name: req.query.name,
                description: req.query.name,
                websiteId: req.params.websiteId
            };

        if (!(page.name && page.websiteId)) {
            retObj.msg = "Page must have a name and a website";
        }
        else {
            page._id = (nextId++).toString();
            pages.push(page);
            retObj.page = page;
        }

        res.json(retObj);
    }

    function deletePage(req, res) {
        var retObj = {},
            pageId = req.params.pageId,
            foundFlag = false;

        for (var i = 0; i < pages.length && !foundFlag; i++) {
            if (pages[i]._id === pageId) {
                foundFlag = true;
                pages.splice(i, 1);
            }
        }

        if (!foundFlag) {
            retObj.msg = "Page with id '" + pageId + "' not found"
        }

        res.json(retObj);
    }

    function findPageById(req, res) {
        var retObj = {},
            pageId = req.params.pageId;

        var page = _findPageById(pageId);

        retObj.page = page;
        retObj.msg = page ? null : "Page with id '" + pageId + "' not found";

        res.json(retObj);
    }

    function findPagesByWebsiteId(req, res) {
        var retObj = {pages: []},
            websiteId = req.params.websiteId;

        for (var i = 0; i < pages.length; i++) {
            if (pages[i].websiteId === websiteId) {
                retObj.pages.push(pages[i]);
            }
        }

        res.json(retObj);
    }

    function updatePage(req, res) {
        var retObj = {},
            pageId = req.params.pageId,
            newPageInfo = {
                name: req.query.name,
                description: req.query.description
            };

        var page = _findPageById(pageId);

        if (page) {
            page.name = newPageInfo.name || page.name; // not clearable
            page.description = newPageInfo.description;
        } else {
            retObj.msg = "Page with id '" + pageId + "' not found";
        }

        res.json(retObj);
    }

    function _findPageById(pageId) {
        var page = null;

        for (var i = 0; i < pages.length; i++) {
            if (pages[i]._id === pageId) {
                page = pages[i];
                break;
            }
        }

        return page;
    }
};