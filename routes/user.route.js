var express = require('express');
var router = express.Router();

const auth = require("../middlewares/auth");

const {
    renderProfileView,
    getBMIwithProfile,
    getBMICurrent,
    renderEditProfileView,
    renderMyMenuView,
    renderCreateNewMenu,
} = require("../controllers/userController");

const { uploadFile } = require(`../controllers/upload.controller`);

router.put("/upload", auth, uploadFile);


router.get("/profile", auth, renderProfileView);
router.get("/getBMI", auth, getBMIwithProfile);
router.get("/getBMICurrent", auth, getBMICurrent);
router.get("/editprofile", auth, renderEditProfileView);
router.get("/mymenu", auth, renderMyMenuView);
router.get("/createMenu", auth, renderCreateNewMenu);


module.exports = router;