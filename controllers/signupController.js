var express = require('express');
var router = express.Router();
var axios = require('axios');

//Sign up new account
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
            alert("Đăng ký thành công. Mời bạn đăng nhập!")
            res.redirect("/");
        }
        else {
            alert("Đăng ký thất bại");
            res.status(500);
        }
    } catch (error) {
        res.status(500);
    }
})

module.exports = router;