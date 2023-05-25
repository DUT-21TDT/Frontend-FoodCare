var express = require('express');
var router = express.Router();
var axios = require('axios');
var multer = require('multer');

// Homepage
router.get("/", (req, res, next) => {
    res.render("pages/homepage", {
        layout: './layouts/main_layout.ejs',
        title: "Home",
    });
});
router.get("/Profile", (req, res, next) => {
    res.render("pages/MyProfile", {
        layout: './layouts/main_layout.ejs',
        title: "My profile",
    });
});



router.get("/CreateMenu", (req, res, next) => {
    res.render("pages/CreateYourMenu", {
        layout: './layouts/main_layout.ejs',
        title: "New menu"
    });
});

router.put("/EditProfile/:id", async (req, res, next) => {
    let [fullname, birth, gender] = req.body;
    let id = req.body.params;
    try {
        await axios.put("URL", {
            name: fullname,
            dateofbirth: birth,
            gender: gender
        }).then(res => {
            console.log(res.message);
        }).catch((err) => {
            console.log({ message: err });
        });
    }
    catch (error) {
        console.log(error);
        res.status(500);
    }
})

//My menu
router.get("/myMenu", (req, res, next) => {
    res.render("pages/MyMenu", {
        layout: './layouts/main_layout.ejs',
        title: "My Menu",
    });
})

//Create menu
router.get("/createMenu", (req, res, next) => {
    res.render("pages/CreateYourMenu", {
        layout: './layouts/main_layout.ejs',
        title: "Create Menu",
    });
});

router.get("/detailMenu", (req, res, next) => {
    res.render("pages/detailMenu", {
        layout: './layouts/main_layout.ejs',
        title: "Detail Menu",
    });
});




module.exports = router;