let express = require('express');
let router = express.Router();

const auth = require("../middlewares/auth");

const { getFoods, getMenus } = require("../controllers/getData.controller");

router.get("/foods", getFoods);

router.get("/menus", getMenus);


module.exports = router;