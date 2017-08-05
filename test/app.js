module.exports = function (app) {
    app.aoaRequire("test/db"); // connect to db

    var testModel = app.aoaRequire("test/model_test")(app);

    app.delete("/api/test/:id", deleteMessage);
    app.get("/api/test", findAllMessages);
    app.post("/api/test", createMessage);

    function createMessage(req, res) {
        testModel
            .createMessage(req.body)
            .then(_genSuccessCb(res), _genErrorCb(res));
    }

    function deleteMessage(req, res) {
        testModel
            .deleteMessage(req.params.id)
            .then(_genSuccessCb(res), _genErrorCb(res));
    }

    function findAllMessages(req, res) {
        testModel
            .findAllMessages()
            .then(_genSuccessCb(res), _genErrorCb(res));
    }

    function _genErrorCb(res) {
        return function (err) {res.status(400).send(err)};
    }

    function _genSuccessCb(res) {
        return function (results) {res.json(results)};
    }
};