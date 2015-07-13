var async = require('async'),
    models = require('./models'),
    sendActivationMail = require('./routes/account/activation').sendActivationMail;

module.exports = function(req, data, next, callback) {
    "use strict";
    var user = new models.User();
    user.email = (data.email || '').toLowerCase().trim();
    if ('full_name' in data) {
        var name_parts = data.full_name.trim().split(' ');
        user.first_name = name_parts.shift();
        user.last_name = name_parts.join(' ');
    } else {
        user.first_name = data.first_name;
        user.last_name = data.last_name;
    }
    user.identity_provider = "register";
    if (data.referred_by) {
        user.invited_by = data.referred_by;
    }

    /***
     * Waterfall:
     * 1) get user by email
     * 2) save user
     * 3) send activation mail
     */
    async.waterfall([
        // 1) get user by email
        function(cbk) {

            var query = {email:new RegExp(user.email,'i')};

            // find pattern of gmail emails where: somename+sometag@gmaildomain.any
            // to prevent use emails with that pattern for registration
            if (user.email.indexOf('+') > 0) {
                var re = /(.*)\+.*@(.*)/ig;
                var m = re.exec(user.email);
                query = {$or: [ {email:m[1] + '@' + m[2]}, {email:new RegExp(m[1] + '\+.*@'+m[2])} ]};
            }

            models.User.findOne(query,cbk);

        },

        // 2) save user
        function(user_obj,cbk) {
            if (!user_obj) {
                user.save(function(err) {
                    if (req !== undefined) {
                        req.session.user = user;
                    }
                    cbk(err);
                });
            }
            else {
                if (req !== undefined) {
                    req.session.user = user_obj;
                }
                cbk('already_exists');
            }
        }],
        // 3) send activation mail
        function(err) {
            if (err) {
                if (callback && callback.call) {
                    callback(err);
                } else {
                    console.log(err);
                }
            } else {
                sendActivationMail(user, next, null, callback);
            }
        });
};


