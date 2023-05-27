var express = require('express');
var router = express.Router();

const { renderFoodDetailView, renderMenuDetailView } = require("../controllers/foodDetailController");

router.get("/menuid=:menuid", renderMenuDetailView);



router.get("/:id", renderFoodDetailView);


module.exports = router;