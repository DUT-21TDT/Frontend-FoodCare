let express = require('express');
let router = express.Router();


const { getFoods, getMenus, getTags, getFoodsByTags } = require("../controllers/getData.controller");

router.get("/foods", getFoods);

router.get("/menus", getMenus);

router.get("/tags", getTags);

router.get("/foods/tags", getFoodsByTags);


module.exports = router;