var express = require('express');
var router = express.Router();
var axios = require('axios');
var multer = require('multer');

router.get("/", (req, res, next) => {
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

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,__path_views + "/assets/images/imgAvatar"); 
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); 
    }
  });
  const upload = multer({ storage: storage });
router.post('/upload', upload.single('image'), function (req, res, next) {
    // req.file contains information about the uploaded file
    res.render("pages/MyProfile.ejs",{
    layout : './layouts/main_layout.ejs'});
    
  });



module.exports = router;