(function() {
    angular
        .module("WamApp")
        .factory("userService", userService);

    function userService() {
        var lastId = "456";
        var users = [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
        ];

        return {
            createUser: createUser,
            deleteUser: deleteUser,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser
        };

        function createUser(user) {
            var response = {};

            if (!user || !user.username || !user.password) {
                response.msg = "User must have a username and a password";
            } else if (user.password !== user.verifyPassword) {
                response.msg = "Passwords do not match";
            } else {
                var findUserRs = this.findUserByUsername(user.username);

                if (!findUserRs.user) {
                    lastId += "1"; // will keep appending one, DB will take care of this
                    var newUser = {
                        _id: lastId,
                        username: user.username,
                        password: user.password,
                        firstName: user.firstName,
                        lastName: user.lastName
                    };
                    users.push(newUser);
                    response.user = newUser;
                } else {
                    response.msg = "Username not available";
                }
            }

            return response;
        }

        function deleteUser(userId) {
            var response = {},
                foundFlag = false;

            for (var i = 0; i < users.length && !foundFlag; i++) {
                if (users[i]._id === userId) {
                    foundFlag = true;
                    users.splice(0, 1);
                }
            }

            if (!foundFlag) {
                response.msg = "User with id '" + userId + "' not found";
            }

            return response;
        }

        function findUserByCredentials(username, password) {
            var response = {},
                foundFlag = false;

            for (var i = 0; i < users.length && !foundFlag; i++) {
                if (users[i].username === username) {
                    if (users[i].password === password) {
                        response.user = users[i];
                        foundFlag = true;
                    } else {
                        response.msg = "Invalid password";
                    }
                }
            }

            if (!foundFlag && !response.msg) {
                response.msg = "Username not found";
            }

            return response;
        }

        function findUserById(userId) {
            var response = {},
                foundFlag = false;

            for (var i = 0; i < users.length && !foundFlag; i++) {
                if (users[i]._id === userId) {
                    response.user = users[i];
                    foundFlag = true;
                }
            }

            if (!foundFlag) {
                response.msg = "User with id '" + userId + "' not found";
            }

            return response;
        }

        function findUserByUsername(username) {
            var response = {},
                foundFlag = false;

            for (var i = 0; i < users.length && !foundFlag; i++) {
                if (users[i].username === username) {
                    response.user = users[i];
                    foundFlag = true;
                }
            }

            if (!foundFlag) {
                response.msg = "User with username '" + username + "' not found";
            }

            return response;
        }

        function updateUser(userId, user) {
            var response = {},
                foundFlag = false;

            if (!user || !user.username) {
                response.msg = "Cannot clear username";
            } else {
                var findUserRs = this.findUserByUsername(user.username);

                if (!findUserRs.user || user._id !== userId) {
                    for (var i = 0; i < users.length && !foundFlag; i++) {
                        if (users[i]._id === userId) {
                            foundFlag = true;
                            users[i].username = user.username;
                            users[i].firstName = user.firstName;
                            users[i].lastName = user.lastName;
                        }
                    }

                    if (!foundFlag) {
                        response.msg = "User with id '" + userId + "' not found";
                    }
                } else {
                    response.msg = "Username unavailable";
                }
            }

            return response;
        }
    }
})();