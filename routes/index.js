var express = require('express');
var router = express.Router();

router.use("/login", require('../controllers/loginController'));

router.use('/begin', require('../controllers/main_Controller'));

router.use("/", require('../controllers/mainController'));


module.exports = router;