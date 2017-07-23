(function() {
    angular
        .module("WamApp")
        .factory("widgetService", widgetService);

    function widgetService() {
        var lastId = "789";
        var widgets = [
            { _id: "123", widgetType: "HEADING", pageId: "321", size: 2, text: "GIZMODO"},
            { _id: "234", widgetType: "HEADING", pageId: "321", size: 4, text: "Lorem ipsum"},
            { _id: "345", widgetType: "IMAGE", pageId: "321", width: "100%", url: "http://25.media.tumblr.com/tumblr_m2vl27ITQy1qz5dg8o1_1280.jpg"},
            { _id: "456", widgetType: "HTML", pageId: "321", text: "<p>Lorem ipsum</p>"},
            { _id: "567", widgetType: "HEADING", pageId: "321", size: 4, text: "Lorem ipsum"},
            { _id: "678", widgetType: "YOUTUBE", pageId: "321", width: "100%", url: "https://www.youtube.com/embed/uiz80CuDN8Y" },
            { _id: "789", widgetType: "HTML", pageId: "321", text: "<p>Lorem ipsum</p>"},
            { _id: "900", widgetType: "HEADING", pageId: "998", size: 4, text: "Lorem ipsum"},
            { _id: "345", widgetType: "IMAGE", pageId: "998", width: "100%", url: "http://25.media.tumblr.com/tumblr_m2vl27ITQy1qz5dg8o1_1280.jpg"},
            { _id: "901", widgetType: "YOUTUBE", pageId: "998", width: "100%", url: "https://www.youtube.com/embed/uiz80CuDN8Y" }
        ];

        return {
            createWidget: createWidget,
            deleteWidget: deleteWidget,
            findWidgetById: findWidgetById,
            findWidgetsByPageId: findWidgetsByPageId,
            updateWidget: updateWidget
        };

        function createWidget(pageId, widget) {
            var response = {};

            if (!widget || !widget.widgetType) {
                response.msg = "Widget must have a type";
            }
            else if (!pageId) {
                response.msg = "Page ID not specified";
            }
            else {
                lastId += "1"; // DB will take care of this automatically
                var newWidget = {
                    _id: lastId,
                    widgetType: widget.widgetType,
                    pageId: pageId,
                    size: widget.size,
                    text: widget.text,
                    width: widget.width,
                    url: widget.url
                };
                widgets.push(newWidget);
                response.widget = newWidget;
            }

            return response;
        }

        function deleteWidget(widgetId) {
            var response = {},
                foundFlag = false;

            for (var i = 0; i < widgets.length && !foundFlag; i++) {
                if (widgets[i]._id === widgetId) {
                    foundFlag = true;
                    widgets.splice(i, 1);
                }
            }

            if (!foundFlag) {
                response.msg = "Widget with id '" + widgetId + "' not found"
            }

            return response;
        }

        function findWidgetById(widgetId){
            var response = {},
                foundFlag = false;

            for (var i = 0; i < widgets.length && !foundFlag; i++) {
                if (widgets[i]._id === widgetId) {
                    foundFlag = true;
                    response.widget = widgets[i];
                }
            }

            if (!foundFlag) {
                response.msg = "Widget with id '" + widgetId + "' not found"
            }

            return response;
        }

        function findWidgetsByPageId(pageId) {
            var response = {widgets: []};

            for (var i = 0; i < widgets.length; i++) {
                if (widgets[i].pageId === pageId) {
                    response.widgets.push(widgets[i]);
                }
            }

            return response;
        }

        function updateWidget(widgetId, widget) {
            var response = {};

            if (!widget) {
                response.msg = "Widget info not specified";
            }
            else {
                var foundFlag = false;

                for (var i = 0; i < widgets.length && !foundFlag; i++) {
                    if (widgets[i]._id === widgetId) {
                        foundFlag = true;
                        widgets[i].size = widget.size;
                        widgets[i].text = widget.text;
                        widgets[i].width = widget.width;
                        widgets[i].url = widget.url;
                    }
                }

                if (!foundFlag) {
                    response.msg = "Widget with id '" + widgetId + "' not found"
                }
            }

            return response;
        }
    }
})();