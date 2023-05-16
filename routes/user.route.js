var express = require('express');
var router = express.Router();

const auth = require("../middlewares/auth");

const {
    renderProfileView,
    getBMIwithProfile,
    getBMICurrent,
    renderEditProfileView,
    //uploadFile,
} = require("../controllers/userController");



router.get("/profile", auth, renderProfileView);
router.get("/getBMI", auth, getBMIwithProfile);
router.get("/getBMICurrent", auth, getBMICurrent);
router.get("/editprofile", auth, renderEditProfileView);
//router.put("/profile/upload", auth, uploadFile);

module.exports = router;