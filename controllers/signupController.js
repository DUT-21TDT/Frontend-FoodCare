var express = require('express');
var router = express.Router();
var axios = require('axios');

//Sign up new account
router.post("/signup", async (req, res, next) => {
    let [fullname, email, username, birth, male, password] = req.body;

    const instance = axios.create({ baseURL: `${process.env.API_URL}/signup` });

    try {
        let response = await instance.post("/", {
            name: fullname,
            email: email,
            username: username,
            dateofbirth: birth,
            Gender: male,
            password: password,
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