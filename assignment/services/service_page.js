module.exports = function (app) {
    var model = app.aoaRequire("/assignment/models/model.js")(app),
        pageModel = model.pageModel,
        websiteModel = model.websiteModel;

    app.get("/api/page/:pageId", findPageById);
    app.get("/api/website/:websiteId/page", findPagesByWebsiteId);
    app.delete("/api/page/:pageId", deletePage);
    app.post("/api/website/:websiteId/page", createPage);
    app.put("/api/page/:pageId", updatePage);

    function createPage(req, res) {
        var websiteId = req.params.websiteId,
            newPage = {
                name: req.query.name,
                description: req.query.description
            };

        if (!(newPage.name && websiteId)) {
            res.json({msg: "Page must have a name and a website"});
        }
        else {
            pageModel
                .createPageForWebsite(websiteId, newPage)
                .then(function (page) {
                        websiteModel
                            .findWebsiteById(websiteId)
                            .then(function (website) {
                                website.pages.push(page._id);
                                websiteModel
                                    .updateWebsite(websiteId, {pages: website.pages})
                                    .then(_genSuccessCb(res));
                            });
                    },
                    _genErrorCb(res)
                );
        }
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;

        pageModel
            .deletePage(pageId)
            .then(_genSuccessCb(res), _genErrorCb(res));
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;

        pageModel
            .findPageById(pageId)
            .then(
                function (page) {
                    res.json({page: page})
                },
                _genErrorCb(res)
            );
    }

    function findPagesByWebsiteId(req, res) {
        var websiteId = req.params.websiteId;

        pageModel
            .findPagesForWebsite(websiteId)
            .then(
                function (pages) {
                    res.json({pages: pages})
                },
                _genErrorCb(res)
            );
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId,
            newPageInfo = {
                name: req.query.name,
                description: req.query.description
            };

        pageModel
            .updatePage(pageId, newPageInfo)
            .then(function (page) {
                    res.json({page: page})
                },
                _genErrorCb(res));
    }

    function _genErrorCb(res) {
        return function (err) {
            // res.status(400).send(err);
            res.json({msg: err.message});
        }
    }

    function _genSuccessCb(res) {
        return function (results) {
            res.json({result: results});
        };
    }
};