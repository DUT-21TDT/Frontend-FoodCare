var express = require('express');
var router = express.Router();

const { renderFoodDetailView } = require("../controllers/foodDetailController");

router.get("/:id", renderFoodDetailView);

module.exports = router;