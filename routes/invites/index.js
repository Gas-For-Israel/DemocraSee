"use strict"

var fs = require('fs'),
    models = require('../../models'),
    register_user = require('../../register_user');

function load(req, res)
{
    if (req.files === undefined || req.files.file === undefined || req.files.file.path === undefined)
    {
        return; // TODO: 404 / 500
    }
    var Invites = models.Invites;
    var count = 0; // async tool "waterfall" all things and then next one.
    var emails = fs.readFileSync(req.files.file.path).toString().split('\n').map(function (x) { return x.trim(); }).filter(function (f) { return f.length > 0; })
    emails.forEach(function (email) {
        console.log('processing invite: ' + email);
        Invites.findOne({email: email}, function (err, obj) {
            if (obj !== null) {
                console.log('Invite not created, exists: ' + email);
            } else {
                var invite = new Invites;
                invite.email = email;
                invite.sent = false;
                invite.save();
            }
            count += 1;
            if (count === emails.length) {
                res.redirect('/admin/model/Invites');
            }
        });
    });
}

function invite(req, res)
{
    // TODO: correct error handling if registerUser fails - do not set invite.sent = true in that case.
    models.Invites.find({sent: false}, function (err, invites) {
        invites.forEach(function (invite) {
            invite.sent = true;
            invite.save();
            register_user(undefined, {email: invite.email, full_name: invite.email});
        });
        res.redirect('/admin/model/Invites');
    });
}

module.exports = function (router)
{
    router.all('/load', load);
    router.all('/invite', invite);
}
