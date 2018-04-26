var moment =  require('moment');
moment.locale('ru');
var mongoose = require('mongoose'),
    User = mongoose.model('User');


function addUser(req, res, next) {
    req.body.createAt = new Date();
    req.body.updateAt = new Date();
    var dateBirth = moment(req.body.dateBirth, "DD.MM.YYYY");
    req.body.dateBirth = dateBirth;
    if(dateBirth < moment()){
        User.findOne({email: req.body.email})
            .then(function (user) {
                if (user) {
                    return res.status(400).json({err: 'This email already used'})
                }
                else {
                    User.create(req.body)
                        .then(function (user) {
                            return res.status(200).json(user);
                        })
                        .catch(function (err) {
                            return res.status(500).json({err: err.message});
                        })
                }
            })
            .catch(function (err) {
                return res.status(500).json({err: err.message});
            })

    }
    else {
        return res.status(400).json({err: "date birth is incorrect"});
    }


}

function deleteUser(req, res, next) {
    User.findByIdAndRemove(req.param('id'))
        .then(function (deleteUser) {
            return res.status(201).json('User deleted')

        })
        .catch(function (err) {
            return res.status(500).json({err: err.message})
        })
}

function updateUserInfo(req, res, next) {
    req.body.updateAt = moment();
    var dateBirth = moment(req.body.dateBirth, "DD.MM.YYYY");
    var userUpdated = {
        firstName:  req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        dateBirth: dateBirth,
        updateAt: moment()
    };
    if(dateBirth < moment()){
        User.findByIdAndUpdate(req.param('id'), {$set: userUpdated}, {new: true})
            .then(function (user) {
                if (user) {
                    return res.status(201).json('User info update')
                }
            })
            .catch(function (err) {
                return res.status(500).json({err: err.message})
            })
    }
    else {
        return res.status(400).json({err: "date birth is incorrect"});
    }
}

function getUsers(req, res, next) {
    User.find({})
        .then(function (user) {
            return res.status(200).json(user);
        })
        .catch(function (err) {
            return res.status(500).json({err: err})
        })
}


module.exports.addUser = addUser;
module.exports.deleteUser = deleteUser;
module.exports.getUsers = getUsers;
module.exports.updateUserInfo = updateUserInfo;