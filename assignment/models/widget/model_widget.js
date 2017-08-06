module.exports = function (app) {
    var mongoose = require("mongoose"),
        widgetSchema = app.aoaRequire("/assignment/models/widget/schema_widget.js")(app),
        widgetModel = mongoose.model("widgetModel", widgetSchema, widgetSchema.options.collection);

    return Object.assign(widgetModel, {
        createWidgetForPage: createWidgetForPage,
        deleteWidget: deleteWidget,
        findWidgetsForPage: findWidgetsForPage,
        findWidgetById: findWidgetById,
        reorderWidget: reorderWidget,
        updateWidget: updateWidget
    });

    function createWidgetForPage(pageId, newWidget) {
        newWidget._page = pageId;
        return widgetModel.create(newWidget, function (err, widget) {
            widgetModel.count({_page: widget._page}, function (err, count) {
                widgetModel.update({_id: widget._id}, {$set: {sortIndex: count - 1}}, function(){});
            });
        });
    }

    function deleteWidget(widgetId) {
        return widgetModel.remove({_id: widgetId});
    }

    function findWidgetsForPage(pageId) {
        return widgetModel
            .find({_page: pageId})
            .sort({sortIndex: 1});
    }

    function findWidgetById(widgetId) {
        return widgetModel.findOne({_id: widgetId});
    }

    function reorderWidget(widgetId, newIndex) {
        return widgetModel
            .findOne({_id: widgetId}, function (err, widget) {
                widgetModel.find({_page: widget._page}, function (err, widgets) {
                        var oldIndex = widget.sortIndex,
                            movedForwardFlag = oldIndex > newIndex;

                        for (var i = 0; i < widgets.length; i++) {
                            if (movedForwardFlag && widgets[i].sortIndex >= newIndex && widgets[i].sortIndex < oldIndex) {
                                widgetModel.update({_id: widgets[i]._id}, {$set: {sortIndex: widgets[i].sortIndex + 1}}, function(){});
                            } else if (!movedForwardFlag && widgets[i].sortIndex > oldIndex && widgets[i].sortIndex <= newIndex) {
                                widgetModel.update({_id: widgets[i]._id}, {$set: {sortIndex: widgets[i].sortIndex - 1}},function(){});
                            } else if (widgets[i]._id.equals(widget.id)) {
                                widgetModel.update({_id: widget.id}, {$set: {sortIndex: newIndex}}, function () {});
                            }
                        }
                    })
            });
    }

    function updateWidget(widgetId, widget) {
        return widgetModel.update({_id: widgetId}, {$set: widget});
    }
};