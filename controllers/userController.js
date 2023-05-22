var axios = require('axios');


const instance = axios.create({ baseURL: `${process.env.API_URL}/` });

const renderProfileView = async (req, res, next) => {

    const userId = req.session.user.userId;

    const userInfo = await getUserInfoByUserId(userId, req.session.token);

    res.render("pages/MyProfile", {
        layout: './layouts/main_layout.ejs',
        title: "My profile",
        userInfo: userInfo.data,
    });
};

const getUserInfoByUserId = async (userId, token) => {
    const userInfo = await instance.get(`/profile/userid=${userId}`, {
        headers: {
            Cookie: `token=${token}`
        }
    }).then((response) => {
        return response.data;
    }).catch((err) => {
        return null;
    });



    return userInfo;
}

const renderEditProfileView = async (req, res, next) => {

    const userId = req.session.user.userId;

    const userInfo = await getUserInfoByUserId(userId, req.session.token);

    res.render("pages/EditProfileNew", {
        layout: './layouts/main_layout.ejs',
        title: "Edit Profile",
        userInfo: userInfo.data,
    });
}

const renderMyMenuView = async (req, res, next) => {
    const userId = req.session.user.userId;

    res.render("pages/MyMenu", {
        layout: './layouts/main_layout.ejs',
        title: "My menu",
    });
}

const renderCreateNewMenu = async (req, res, next) => {
    const userId = req.session.user.userId;

    res.render("pages/CreateYourMenu", {
        layout: './layouts/main_layout.ejs',
        title: "New menu",
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

const getBMICurrent = async (req, res, next) => {
    const BMIs = await instance.get("/profile/bmi-records/current", {
        headers: {
            Cookie: `token=${req.session.token}`
        }
    }).then((data) => {
        return data.data;
    }).catch((err) => {
        return null;
    });
    if (BMIs) {
        res.json({
            success: true,
            message: "get BMI successfuly.",
            data: BMIs.data
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
    getBMICurrent,
    renderEditProfileView,
    renderMyMenuView,
    renderCreateNewMenu,
};