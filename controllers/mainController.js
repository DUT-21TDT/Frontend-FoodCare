var express = require('express');
var router = express.Router();
var axios = require('axios');

//Homepage
router.get("/", (req, res, next) => {
    res.render("pages/homepage", {
        layout: './layouts/main_layout.ejs',
        title: "Home",
        auth: 0
    });
});

//My Profile
router.get("/profile", (req, res, next) => {
    res.render("pages/MyProfile", {
        layout: './layouts/main_layout.ejs',
        title: "My Profile",
        auth: 0
    });
});

//My menu
router.get("/myMenu", (req, res, next) => {
    res.render("pages/MyMenu", {
        layout: './layouts/main_layout.ejs',
        title: "My Menu",
        auth: 0
    });
})

//Create menu
router.get("/createMenu", (req, res, next) => {
    res.render("pages/CreateYourMenu", {
        layout: './layouts/main_layout.ejs',
        title: "Create Menu",
        auth: 0
    });
})



module.exports = router;