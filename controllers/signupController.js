var express = require('express');
var router = express.Router();
var axios = require('axios');

//Sign up new account
router.post("/", async (req, res, next) => {
    // let fullname = req.body.name;
    // let username = req.body.username;
    // let birth = req.body.birth;
    // let password = req.body.password;
    // let gender = 1;
    // if (req.body.male != "on") gender = 0;
    let { fullname, email, username, birth, password } = req.body;


    const instance = axios.create({ baseURL: `${process.env.API_URL}/signup` });

    try {
        var data = await instance.post("/", {
            name: fullname,
            email: email,
            username: username,
            dateofbirth: birth,
            gender: 1,
            password: password
        }).then(res => {
            return res.data;
        }).catch((err) => {
            console.log({ message: err });
        });

        if (data.success) {
            console.log("Đăng ký thành công");
            res.redirect("/");
        }
        else {
            console.log("Đăng ký thất bại");
            res.redirect("/");
        }
    } catch (error) {
        res.status(500);
    }
})

module.exports = router;