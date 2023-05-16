var express = require('express');
var router = express.Router();
var axios = require('axios');

//Homepage
router.get("/", (req, res, next) => {
  res.render("pages/homepage", {
    layout: './layouts/main_layout.ejs',
    title: "Food Care",
  });
});

router.post("/", async (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;

  const instance = axios.create({ baseURL: `${process.env.API_URL}/login` });

  console.log(`${process.env.API_URL}/login`);

  try {
    var data = await instance.post("/", { // /api/v1/login/
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
      }

      res.redirect("/");

      console.log(req.session.user)

    } else {
      res.status(400).send("Đăng nhập thất bại");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Đã xảy ra lỗi");
  }
});


module.exports = router;