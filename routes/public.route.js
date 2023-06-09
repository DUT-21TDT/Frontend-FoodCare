var express = require('express');
var router = express.Router();

const { renderFoodDetailView, renderMenuDetailView, getFoodInfoById } = require("../controllers/foodDetailController");

router.get("/menuid=:menuid", renderMenuDetailView);

router.get("/", getFoodInfoById);

router.get("/:id", renderFoodDetailView);


module.exports = router;