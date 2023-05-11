var express = require('express');
var router = express.Router();
var axios = require('axios');

router.post("/signup", async (req, res, next) => {
    let [password, newpassword] = req.body;

    const instance = axios.create({ baseURL: `${process.env.API_URL}/change-password` });

    try {
        let response = await instance.post("/", {
            oldpassword: password,
            newpassword: newpassword
        })

        if (response.status == 200) {
            alert("Đổi mật khẩu thành công!")
            res.redirect("/");
        }
        else {
            alert("Đổi mật khẩu thất bại");
            res.redirect("/");
        }
    } catch (error) {
        res.status(500);
    }
})
