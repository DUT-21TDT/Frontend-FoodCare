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
    userChangePassword,
    updateProfileUser,
    updateBMI,
    reactMenu,
    getMyMenuData,
    getUserInfo,
    deleteMenuDetailById,
    likeMenuById,
    unLikeMenuById,
    userCreateMenu,
    userRatingMenu,
    getViewEditMenu,
    renderOwnMenuDetailView,
    updateMenu,
    updateImageProfile,
} = require("../controllers/userController");

const { uploadFile } = require(`../controllers/upload.controller`);

router.put("/upload", auth, uploadFile);
router.put("/updateImageProfile", auth, updateImageProfile)


router.get("/profile", auth, renderProfileView);
router.get("/getBMI", auth, getBMIwithProfile);
router.get("/getBMICurrent", auth, getBMICurrent);
router.get("/editprofile", auth, renderEditProfileView);
router.get("/mymenu", auth, renderMyMenuView);
router.get("/createMenu", auth, renderCreateNewMenu);
router.put("/change-password", auth, userChangePassword);
router.put("/update-profile", auth, updateProfileUser);
router.post("/updateBMI", auth, updateBMI);
router.post("/menu=:menudid", auth, reactMenu);
router.get("/getMyMenu", auth, getMyMenuData);
router.delete("/deleteMenu:id", auth, deleteMenuDetailById);
router.post("/likeMenu:id", auth, likeMenuById);
router.post("/unLikeMenu:id", auth, unLikeMenuById);

router.post("/menus/create", auth, userCreateMenu);
router.post("/userComment:id", auth, userRatingMenu);
router.get("/getViewEditMenu:id", auth, getViewEditMenu);
router.put("/menus/menuid=:id/update", auth, updateMenu);
router.get("/menuid=:menuid", auth, renderOwnMenuDetailView);

router.get("/getUserInfo", auth, getUserInfo);

module.exports = router;