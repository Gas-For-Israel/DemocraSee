"use strict"

function load(req, res)
{
    console.log('do the load from file');
    // res.render?
}

function invite(req, res)
{
    console.log('do the invite');
    // res.render?
}

module.exports = function (router)
{
    router.all('/load', load);
    router.all('/invite', invite);
}
