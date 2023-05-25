var express = require('express');
var router = express.Router();
var axios = require('axios');

// Sign up new account
router.post("/", async (req, res, next) => {
    let { fullname, email, username, birth, password, gender } = req.body;

    if (gender === "male") {
        gender = 0;
    } else if (gender === "female") {
        gender = 1;
    }

    const instance = axios.create({ baseURL: `${process.env.API_URL}/signup` });

    try {
        var data = await instance
            .post("/", {
                name: fullname,
                email: email,
                username: username,
                dateofbirth: birth,
                gender: gender,
                password: password,
            })
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                if (err.response && err.response.status === 401) {
                    return { success: false, message: err.response.data.message };
                } else {
                    // Handle other errors
                    throw err;
                }
            });


        if (data.success) {
            res.redirect("/?notification=Đăng ký thành công");
        } else {
            res.redirect(`/?notification=${data.message}`);
        }

    } catch (error) {
        res.status(500);
    }
});

module.exports = router;