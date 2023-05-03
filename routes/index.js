var express = require('express');
var router = express.Router();

router.use('/user', require('../controllers/mainController'));

router.use('/', require('../controllers/loginController'));

module.exports = router;