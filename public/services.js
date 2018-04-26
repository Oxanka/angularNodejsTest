angular.module('myApp.services', [])

    .service('User', function ($http, $rootScope, $location, API, msg) {
        var newUser = function (user) {
            return $http({
                method: "post",
                url: API + "/user/adduser",
                data: user
            }).then(function (user) {
                $rootScope.$emit('closePopoup', user);
                getAllUsers();
            })
                .catch(function (err) {
                    console.log(err);
                    msg.errorMsg(err.data.err);
                })
        };
        var getAllUsers = function (user_email) {
            console.log("API", API);
            return $http({
                method: "get",
                url: API + "/user/getallusers"
            }).then(function (user_info) {
                console.log('user_info', user_info);
                $rootScope.$emit("getAllUsers", user_info.data);
            }).catch(function (err) {
                console.log(err);
                msg.errorMsg(err.data.err);
            })
        };
        var updateUser = function (idUser, userInfo) {
            return $http({
                method: "put",
                url: API + "/user/updateuser/" + idUser,
                data: userInfo
            }).then(function (updateStudent) {
                $rootScope.$emit('closePopoup', updateStudent);
                getAllUsers();
            }).catch(function (err) {
                console.log(err);
                msg.errorMsg(err.data.err);
            })
        };
        var deleteUser = function (idUser) {
            return $http({
                method: "delete",
                url: API + "/user/deleteuser/" + idUser
            }).then(function (updateStudent) {
                $rootScope.$emit('closePopoup', updateStudent);
                getAllUsers()
            }).catch(function (err) {
                console.log(err);
                msg.errorMsg(err.data.err);
            })
        };

        return {
            newUser: newUser,
            getAllUsers: getAllUsers,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
    })

    .service('msg', function () {
        var errorMsg = function (msg) {
            alert(msg)
        };

        return {
            errorMsg: errorMsg
        }
    })
    .service('$upload', function () {
        var upload = angular.element('<div class="ng-upload" style="display: none">').appendTo(document.body);

        return {
            open(options, done) {
                if (typeof options == 'function') {
                    done = options;
                }

                var accept = options.accept || false;
                var multiple = options.multiple || false;

                var file = angular.element('<input type="file">').appendTo(upload);

                if (accept) {
                    file.attr('accept', accept);
                }

                if (multiple) {
                    file.attr('multiple', multiple);
                }

                file.off().on('change', function (event) {
                    var files = event.target.files;

                    if (files[0]) {
                        var reader = new FileReader();

                        reader.onload = function (event) {
                            done(files, event.target.result);

                            file.remove();
                        };

                        reader.readAsDataURL(event.target.files[0]);
                    } else {
                        done(files, '');

                        file.remove();
                    }
                });

                file.trigger('click');
            }
        };
    })

