var express = require('express');
var router = express.Router();
var axios = require('axios');

//Homepage
router.get("/", (req, res, next) => {
    res.render("pages/homepage", {
        layout: './layouts/main_layout.ejs',
        title: "Food Care",
        auth: 1
    });
});

router.get("/detailMenu", (req, res, next) => {
    res.render("pages/detailMenu", {
        layout: './layouts/main_layout.ejs',
        title: "Detail Menu",
        auth: 1
    });
});



module.exports = router;