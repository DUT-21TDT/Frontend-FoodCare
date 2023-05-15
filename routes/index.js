var express = require('express');
var router = express.Router();

// router.use('/user', require('../controllers/mainController'));

router.use('/', require('../controllers/loginController'));

router.use('/logout', require('../controllers/logoutController'));

router.use('/signup', require('../controllers/signupController'));

router.use("/user", require('./user.route'));

module.exports = router;