// static for now, but could use headers/cookies to set a preferred language
module.exports = function () {

    return function (req, res, next) {
        res.locals.context = res.locals.context || {};
        res.locals.context.locality = "en_US";
        next();
    };
};