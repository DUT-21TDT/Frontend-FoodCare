var express = require('express');
var router = express.Router();

router.get("/", (req, res, next) => {
    res.render("pages/homepage.ejs",
     {
        layout:  './layouts/layoutLogin.ejs'
      });
        
});
module.exports = router;