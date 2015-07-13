"use strict"

var models = require('../../models')
    ,async = require('async')
    ,common = require('./common')
    ,config = require('../../config'),
    register_user = require('../../register_user');

module.exports = {
    post:function (req, res) {
        var next = req.body.next || req.query.next || '';
        var data = req.body;

        registerUser(req,data,next,function(err,user) {
            if(err)
                res.render('register.ejs', {
                    user: user,
                    next: req.query.next,
                    title: "רישום",
                    body: req.body || {},
                    error_message: err.message || err
                });
            else
                res.redirect('/?is_new=register&next=' + next);
        });
    },

    get:function (req, res) {
        var user = {
            _id: req.session.auth.user ? req.session.auth.user.user_id : null
        };

        res.render('register.ejs',{
            tag_name:req.query.tag_name,
            user: user /*req.session.auth.user*/,
            next: req.query.next,
            body:req.query || {},
            title: "רישום"
        });
    }
};

/**
 * Registers user and callbacks with a user object
 * @param req: {session.referred_by?}
 * @param data: {email,full_name|(first_name,last_name)}
 * @param next
 * @param callback
 * function(err,user)
 */
var registerUser = module.exports.registerUser = function(req,data,next,callback) {
    var user;
    if (!config.registration_enabled) {
        callback('אינך מורשה להרשם לאתר זה');
        return;
    }
    /**
     * Waterfall:
     * 1) register user
     * 2) authenticate to log user in
     * Final) Render response
     */
    async.waterfall([
        // 1) register the user
        function (cbk) {
            register_user(req,
            {
                email: data.email,
                first_name: data.first_name,
                last_name: data.last_name,
                full_name: data.full_name,
                referred_by: req.session.referred_by,
            }, next, cbk);
        },
        // 2) authenticate to log user in
        function(data, cbk) {
            var temp_password = data.temp_password;
            user = data.user;
            req.body.email = user.email;
            req.body.password = temp_password;
            req.authenticate('simple',function(err,is_authenticated) {
                cbk(err,is_authenticated);
            });
        }
        ],
        // Final) Render response
        function(err) {
            callback(err,{user: user, next: next});
        }
    );
}
