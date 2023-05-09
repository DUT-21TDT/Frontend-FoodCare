var express = require('express');
var router = express.Router();
var axios = require('axios');


router.get("/", async (req, res, next) => {
    req.session.destroy(function (err) { return res.redirect("/"); });
});

module.exports = router;