var axios = require('axios');

const instance = axios.create({ baseURL: `${process.env.API_URL}/` });

const renderProfileView = (req, res, next) => {
    res.render("pages/MyProfile", {
        layout: './layouts/main_layout.ejs',
        title: "My profile",
    });
};

const getBMIwithProfile = async (req, res, next) => {
    const BMIs = await instance.get("/profile/bmi-records/all", {
        headers: {
            Cookie: `token=${req.session.token}`
        }
    }).then((data) => {
        return data.data;
    }).catch((err) => {
        return null;
        console.log({ message: err });
        throw err;
    });
    if (BMIs) {
        res.json({
            success: true,
            message: "get BMI successfuly.",
            data: BMIs.data.list
        });
    } else {
        res.json({
            success: false,
            message: "get BMI error",
            data: null
        });
    }
}

module.exports = {
    renderProfileView,
    getBMIwithProfile,
};