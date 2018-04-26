var express = require('express');
var router = express.Router();
var userCtrl = require('../../controllers/UserController');
router
    .get('/getallusers', userCtrl.getUsers)
    .post('/adduser', userCtrl.addUser)
    .delete('/deleteuser/:id', userCtrl.deleteUser)
    .put('/updateuser/:id', userCtrl.updateUserInfo)
;



module.exports = router;