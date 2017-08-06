module.exports = function (app, model) {
    var userModel = model.userModel,
        websiteModel = model.websiteModel;

    app.get("/api/user/:userId/website", findWebsitesByUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.delete("/api/website/:websiteId", deleteWebsite);
    app.post("/api/user/:userId/website", createWebsite);
    app.put("/api/website/:websiteId", updateWebsite);

    function createWebsite(req, res) {
        var userId = req.params.userId,
            newWebsite = {
                name: req.query.name,
                description: req.query.description
            };

        if (!(newWebsite.name && userId)) {
            res.json({msg: "Website must have a name and a developer"});
        }
        else {
            websiteModel
                .createWebsiteForUser(userId, newWebsite)
                .then(function (website) {
                        userModel
                            .findUserById(userId)
                            .then(function (user) {
                                user.websites.push(website._id);
                                userModel
                                    .updateUser(userId, {websites: user.websites})
                                    .then(_genSuccessCb(res));
                            });
                    },
                    _genErrorCb(res)
                );
        }
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;

        // TODO cascading deletes
        // websiteModel
        //     .findWebsiteById(websiteId)
        //     .then(function (website) {
                websiteModel
                    .deleteWebsite(websiteId)
                    .then(_genSuccessCb(res), _genErrorCb(res));
                    // .then(function () {
                    //         // userModel
                    //         //     .findUserById(website._user)
                    //         //     .then(function (user) {
                    //         //         var index = user.websites.indexOf(website._id);
                    //         //         user.websites.splice(index, 1);
                    //         //
                    //         //         userModel
                    //         //             .updateUser(user._id, {websites: user.websites})
                    //         //             .then(_genSuccessCb(res));
                    //         //     });
                    //     },
                    //     _genErrorCb(res)
                    // );
            // });
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;

        websiteModel
            .findWebsiteById(websiteId)
            .then(
                function (website) {
                    res.json({website: website})
                },
                _genErrorCb(res)
            );
    }

    function findWebsitesByUser(req, res) {
        var userId = req.params.userId;

        websiteModel
            .findWebsitesForUser(userId)
            .then(
                function (websites) {
                    res.json({websites: websites})
                },
                _genErrorCb(res)
            );
    }

    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId,
            newWebsiteInfo = {
                name: req.query.name,
                description: req.query.description
            };

        websiteModel
            .updateWebsite(websiteId, newWebsiteInfo)
            .then(function (website) {
                    res.json({website: website})
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