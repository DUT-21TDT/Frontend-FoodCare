var express = require('express');
var router = express.Router();

const auth = require("../middlewares/auth");

const {
    renderProfileView,
    getBMIwithProfile,
    renderEditProfileView,
} = require("../controllers/userController");



router.get("/profile", auth, renderProfileView);
router.get("/getBMI", auth, getBMIwithProfile);
router.get("/editprofile",auth,renderEditProfileView);
//router.put("/profile/upload", auth, uploadFile);

module.exports = router;