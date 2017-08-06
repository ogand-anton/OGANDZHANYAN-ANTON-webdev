module.exports = function (app, model) {
    var pageModel = model.pageModel,
        widgetModel = model.widgetModel;

    app.get("/api/page/:pageId/widget", findWidgetsByPageId);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.post("/api/page/:pageId/widget", createWidget);
    app.post("/api/upload", uploadImage);
    app.put("/api/page/:pageId/widget", reorderWidget);
    app.put("/api/widget/:widgetId", updateWidget);

    function createWidget(req, res) {
        var pageId = req.params.pageId,
            widget = {
                widgetType: req.query.widgetType,
                name: req.query.name,
                text: req.query.text,
                size: req.query.size,
                height: req.query.height,
                width: req.query.width,
                url: req.query.url
            };

        if (!(pageId && widget.widgetType)) {
            res.json({msg: "Widget must have a type and a page id"});
        } else {
            widgetModel
                .createWidgetForPage(pageId, widget)
                .then(function (widget) {
                        pageModel
                            .findPageById(pageId)
                            .then(function (page) {
                                page.widgets.push(widget._id);
                                pageModel
                                    .updatePage(pageId, {widgets: page.widgets})
                                    .then(function () {
                                        res.json({widget: widget});
                                    });
                            });
                    },
                    _genErrorCb(res)
                );
        }
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;

        widgetModel
            .deleteWidget(widgetId)
            .then(_genSuccessCb(res), _genErrorCb(res));
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;

        widgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                    res.json({widget: widget});
                },
                _genErrorCb(res));
    }

    function findWidgetsByPageId(req, res) {
        var pageId = req.params.pageId;

        widgetModel
            .findWidgetsForPage(pageId)
            .then(function (widgets) {
                    res.json({widgets: widgets});
                },
                _genErrorCb(res));
    }

    function reorderWidget(req, res) {
        var widgetId = req.body.widgetId,
            sortIndex = req.body.sortIndex;

        widgetModel
            .reorderWidget(widgetId, sortIndex)
            .then(_genSuccessCb(res), _genErrorCb(res));
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId,
            newWidgetInfo = req.body;

        widgetModel
            .updateWidget(widgetId, newWidgetInfo)
            .then(_genSuccessCb(res), _genErrorCb(res));
    }

    function uploadImage(req, res) {
        var userId = req.body.userId,
            websiteId = req.body.websiteId,
            pageId = req.body.pageId,
            widgetId = req.body.widgetId,
            myFile = req.file;

        if (myFile) {
            widgetModel
                .updateWidget(widgetId, {url: "/uploads/" + myFile.filename})
                .then(function () {
                        res.redirect("/assignment/#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
                    },
                    _genErrorCb(res));
        } else {
            res.redirect("/assignment/#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
        }
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