let express = require('express');
let router = express.Router();

const {getFoods, getMenus} = require("../controllers/getData.controller");

router.get("/foods", getFoods);
router.get("/menus", getMenus);

module.exports = router;