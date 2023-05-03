var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get("/test", (req, res, next) => {
    res.render("pages/homepage", {
        layout: './layouts/main_layout.ejs',
        title: "Dashboard"
    });
});

router.get("/profile", (req, res, next) => {
    res.render("pages/MyProfile", {
        layout: './layouts/main_layout.ejs',
        title: "My Profile"
    });
});

router.get("/myMenu", (req, res, next) => {
    res.render("pages/MyMenu", {
        layout: './layouts/main_layout.ejs',
        title: "My Menu"
    });
})

router.get("/createMenu", (req, res, next) => {
    res.render("pages/CreateYourMenu", {
        layout: './layouts/main_layout.ejs',
        title: "Create Menu"
    });
})



module.exports = router;