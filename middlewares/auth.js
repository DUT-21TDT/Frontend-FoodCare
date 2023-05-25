module.exports = function (req, res, next) {
    if (req.session && req.session.token) {
        return next();
    } else {
        res.redirect("/");
    }
}