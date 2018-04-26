'use strict';

var express = require('express');

var user = require('./api/user');

var router = express.Router();

var env = process.env.NODE_ENV || "dev";

module.exports.init = function (app) {
    /**
     * handle all requests for testing
     */
    router.use(function (req, res, next) {
        if (env === "dev" || env === "test") {
            // console.log("|| REQ QUERY ||\n " + JSON.stringify(req.query));
            // console.log("|| REQ BODY ||\n " + JSON.stringify(req.query));
            // console.log("|| REQ PATH VARIABLES ||\n " + JSON.stringify(req.query));
        }
        next();
    });

    /**
     * authentication filter
     */
    function isAuth (req, res, next) {
        var token = req.header('token');
        if(token != undefined){
            if (token === req.session.token) {
                next();
            } else {
                return res.status(401).json("Auth Error");
            }
        }
        else{
            return res.status(401).json("Auth Error. User undefined");
        }


    }

    /**
     // * Define Api
     */
    router.use('/auth', user);
    router.use('/user', user);


    app.use("/", router);
    app.use('/*', function(req, res) {
        // res.redirect('/404')
    })

};