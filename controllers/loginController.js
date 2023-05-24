var express = require('express');
var router = express.Router();
var axios = require('axios');

//Homepage
router.get("/", (req, res, next) => {
  const notification = req.query.notification;

  res.render("pages/homepage", {
    layout: './layouts/main_layout.ejs',
    title: "Food Care",
    notification: notification
  });
});

router.post("/", async (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;

  const instance = axios.create({ baseURL: `${process.env.API_URL}/login` });

  try {
    var data = await instance.post("/", {
      username: username,
      password: password
    }).then(res => {
      return res.data;
    }).catch((err) => {
      console.log({ message: err });
    });

    if (data.success) {
      req.session.token = data.token;
      req.session.user = {
        "username": data.data.username,
        "avatarImg": data.data.avatar,
        "userId": data.data.userid,
      }
      res.redirect("/");



    } else {
      res.redirect(`/?notification=${data.message}`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Đã xảy ra lỗi");
  }
});

module.exports = router;