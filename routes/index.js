var express = require('express');
var router = express.Router();

// router.use('/user', require('../controllers/mainController'));

router.use('/', require('../controllers/loginController'));

router.use('/logout', require('../controllers/logoutController'));

router.use('/signup', require('../controllers/signupController'));

router.use("/user", require('./user.route'));

router.use("/foodDetail", require('./public.route'));

router.use("/get", require('./getData.route'));

module.exports = router;