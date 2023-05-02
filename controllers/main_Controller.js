var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get("/test", (req, res, next) => {
    res.render("pages/homepage", {
        layout: './layouts/main_layout.ejs',
        title: "Dashboard"
    });
});

module.exports = router;