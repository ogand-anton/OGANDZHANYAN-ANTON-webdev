module.exports = function (app) {
    var widgets = [
            {_id: "456", widgetType: "HTML", pageId: "321", text: "<p>Lorem ipsum</p>"},
            {_id: "789", widgetType: "HTML", pageId: "321", text: "<p>Lorem ipsum</p>"},
            {_id: "123", widgetType: "HEADING", pageId: "321", size: 2, text: "GIZMODO"},
            {_id: "234", widgetType: "HEADING", pageId: "321", size: 4, text: "Lorem ipsum"},
            {_id: "567", widgetType: "HEADING", pageId: "321", size: 4, text: "Lorem ipsum"},
            {
                _id: "345",
                widgetType: "IMAGE",
                pageId: "321",
                width: "100%",
                url: "http://25.media.tumblr.com/tumblr_m2vl27ITQy1qz5dg8o1_1280.jpg"
            },
            {
                _id: "678",
                widgetType: "YOUTUBE",
                pageId: "321",
                height: 350,
                width: "100%",
                url: "https://www.youtube.com/embed/uiz80CuDN8Y"
            },
            {_id: "900", widgetType: "HEADING", pageId: "998", size: 4, text: "Lorem ipsum"},
            {
                _id: "665",
                widgetType: "IMAGE",
                pageId: "998",
                width: "100%",
                url: "http://25.media.tumblr.com/tumblr_m2vl27ITQy1qz5dg8o1_1280.jpg"
            },
            {
                _id: "901",
                widgetType: "YOUTUBE",
                pageId: "998",
                height: 350,
                width: "100%",
                url: "https://www.youtube.com/embed/uiz80CuDN8Y"
            }
        ],
        nextId = 666;

    app.get("/api/page/:pageId/widget", findWidgetsByPageId);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.post("/api/page/:pageId/widget", createWidget);
    app.put("/api/widget/:widgetId", updateWidget);

    function createWidget(req, res) {
        var retObj = {},
            widget = {
                pageId: req.params.pageId,
                widgetType: req.query.widgetType,
                name: req.query.name,
                text: req.query.text,
                size: parseInt(req.query.size),
                height: parseInt(req.query.height),
                width: req.query.width,
                url: req.query.url
            };

        if (!(widget.pageId && widget.widgetType)) {
            retObj.msg = "Widget must have a type and a page id";
        } else {
            widget._id = (nextId++).toString();

            var insertionIndex = 0;
            var pageFound = false;
            for (var i = 0; i < widgets.length; i++) {
                insertionIndex++;

                if (widgets[i].pageId === widget.pageId) {
                    pageFound = true;
                } else if (pageFound) {
                    break; // page found but passed all other widgets for this page
                }
            }

            widgets.splice(insertionIndex, 0, widget);
            retObj.widget = widget;
        }

        res.send(retObj);
    }

    function deleteWidget(req, res) {
        var retObj = {},
            widgetId = req.params.widgetId,
            foundFlag = false;

        for (var i = 0; i < widgets.length && !foundFlag; i++) {
            if (widgets[i]._id === widgetId) {
                foundFlag = true;
                widgets.splice(i, 1);
            }
        }

        if (!foundFlag) {
            retObj.msg = "Widget with id '" + widgetId + "' not found"
        }

        res.json(retObj);
    }

    function findWidgetById(req, res) {
        var retObj = {},
            widgetId = req.params.widgetId;

        var widget = _findWidgetById(widgetId);

        retObj.widget = widget;
        retObj.msg = widget ? null : "Widget with id '" + widgetId + "' not found";

        res.send(retObj);
    }

    function findWidgetsByPageId(req, res) {
        var retObj = {},
            pageId = req.params.pageId;

        retObj.widgets = _findWidgetsByPageId(pageId);

        res.send(retObj);
    }

    function updateWidget(req, res) {
        var retObj = {},
            widgetId = req.params.widgetId,
            newWidgetInfo = {
                name: req.query.name,
                text: req.query.text,
                size: parseInt(req.query.size),
                width: req.query.width,
                height: parseInt(req.query.height),
                url: req.query.url
            },
            sortIndex = parseInt(req.query.sortIndex);

        var widget = _findWidgetById(widgetId);

        if (widget) {
            if (!(sortIndex && sortIndex !== widget.sortIndex)) {
                widget.name = newWidgetInfo.name;
                widget.text = newWidgetInfo.text;
                widget.size = Math.max(Math.min(newWidgetInfo.size, 5), 1) || widget.size;
                widget.height = newWidgetInfo.height;
                widget.width = newWidgetInfo.width;
                widget.url = newWidgetInfo.url;
            } else {
                var pageStartIndex = 0;
                var pageWidgetIndex = 0;
                var widgetIndex = -1;
                for (var i = 0; i < widgets.length; i++) {
                    if (widgets[i].pageId !== widget.pageId) {
                        pageStartIndex++;
                    } else if (pageWidgetIndex !== sortIndex) {
                        pageWidgetIndex++;
                    }

                    if (widgets[i]._id === widgetId) {
                        widgetIndex = i;
                    }
                }
                widgets.splice(pageStartIndex + pageWidgetIndex, 0, widgets.splice(widgetIndex, 1)[0]);
                retObj.widgets = widgets;
            }
        } else {
            retObj.msg = "Widget with id '" + widgetId + "' not found";
        }

        res.json(retObj);
    }

    function _compareWidgetsBySortId(w1, w2) {
        return w1.sortId - w2.sortId;
    }

    function _findWidgetById(widgetId) {
        var widget = null;

        for (var i = 0; i < widgets.length; i++) {
            if (widgets[i]._id === widgetId) {
                widget = widgets[i];
                break;
            }
        }

        return widget;
    }

    function _findWidgetsByPageId(pageId) {
        var retArr = [];

        for (var i = 0; i < widgets.length; i++) {
            if (widgets[i].pageId === pageId) {
                retArr.push(widgets[i]);
            }
        }

        return retArr.sort(_compareWidgetsBySortId);
    }
};