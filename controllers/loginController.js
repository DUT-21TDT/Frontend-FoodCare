var express = require('express');
var router = express.Router();
var axios = require('axios');

//Homepage
router.get("/", (req, res, next) => {
  res.render("pages/homepage", {
    layout: './layouts/main_layout.ejs',
    title: "Food Care",
    auth: 1
  });
});

router.get("/detailMenu", (req, res, next) => {
  res.render("pages/detailMenu", {
    layout: './layouts/main_layout.ejs',
    title: "Detail Menu",
    auth: 1
  });
});

router.post("/userLogin", async (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;

  try {
    let response = await axios.post("https://reqres.in/api/login", {
      email: username,
      password: password
    });

    if (response.status == 200) {
      // let tokenId = response.data.token;
      // let accounts = response.data.data;

      // req.session.tokenId = tokenId;
      // req.session.accounts = accounts;
      res.redirect("http://localhost:8080");
    } else {
      res.status(400).send("Đăng nhập thất bại");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Đã xảy ra lỗi");
  }
});


router.post("/signup", async (req, res, next) => {
  let [fullname, email, username, birth, sex, password] = req.body;
  try {
    let response = await axios.post("URL", {
      Name: fullname,
      email: email,
      Username: username,
      DateofBirth: birth,
      Gender: sex,
      Password: password,
    })

    if (response.status == 200) {
      res.render("pages/homepage.ejs",
        {
          layout: './layouts/main_layout.ejs'
        });
    }
    else {
      alert("Đã đăng ký thành công");
      res.status(500);
    }
  } catch (error) {
    res.status(500);
  }
})

module.exports = router;