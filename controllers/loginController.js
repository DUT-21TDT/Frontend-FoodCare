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
      // let tokenId = response.data.token;
      // let accounts = response.data.data;
      // req.session.tokenId = tokenId;
      // req.session.accounts = accounts;
      //Phân quyền user + get data user để set header
      // req.session.token = data.data.token;
      // req.session.user = {
      //   "username": data.data.username
      // }
      // res.redirect("/user");
      res.redirect("http://localhost:8080/user");
    } else {
      res.status(400).send("Đăng nhập thất bại");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Đã xảy ra lỗi");
  }
});


// router.post("/signup", async (req, res, next) => {
//   let [fullname, email, username, birth, sex, password] = req.body;
//   try {
//     let response = await axios.post("URL", {
//       Name: fullname,
//       email: email,
//       Username: username,
//       DateofBirth: birth,
//       Gender: sex,
//       Password: password,
//     })

//     if (response.status == 200) {
//       alert("Đăng ký thành công. Mời bạn đăng nhập!")
//       res.redirect("/");
//     }
//     else {
//       alert("Đăng ký thất bại");
//       res.status(500);
//     }
//   } catch (error) {
//     res.status(500);
//   }
// })

module.exports = router;