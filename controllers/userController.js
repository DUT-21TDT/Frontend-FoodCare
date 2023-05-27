var axios = require('axios');


const instance = axios.create({ baseURL: `${process.env.API_URL}/` });

const renderProfileView = async (req, res, next) => {

    const userId = req.session.userId;

    const userInfo = await getUserInfoByUserId(userId, req.session.token);

    console.log(userInfo);

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
    const notification = req.query.notification;

    const userId = req.session.userId;

    const userInfo = await getUserInfoByUserId(userId, req.session.token);

    res.render("pages/EditProfileNew", {
        layout: './layouts/main_layout.ejs',
        title: "Edit Profile",
        userInfo: userInfo.data,
        notification: notification,
    });
}

const renderMyMenuView = async (req, res, next) => {

    res.render("pages/MyMenu", {
        layout: './layouts/main_layout.ejs',
        title: "My menu",
    });
}

const renderCreateNewMenu = async (req, res, next) => {

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
const userChangePassword = async (req, res, next) => {
    let oldpassword = req.body.oldpassword;
    let newpassword = req.body.newpassword;
    let newpasswordAgain = req.body.newpasswordAgain;
    const data = {
        "oldpassword": oldpassword,
        "newpassword": newpassword,
    }
    if (newpassword === newpasswordAgain) {
        let responseData = await instance.put("/profile/change-password", data, {
            headers: {
                Cookie: `token=${req.session.token}`
            }
        }).then(response => {
            return response.data;
        }).catch(error => {
            console.log({ message: error.message });
            return {
                "sucess": false,
            }
        });
        return responseData;
    }

}
const updateProfileUser = async (req, res, next) => {

    let name = req.body.name;
    let dateofbirth = req.body.dateofbirth;
    let gender = req.body.gender;

    const data = {
        "name": name,
        "dateofbirth": dateofbirth,
        "gender": gender,
    };
    const response = await instance.put("/profile/update-profile", data, {
        headers: {
            Cookie: `token=${req.session.token}`,
        },
    })
        .then((data) => {
            return data.data;
        })
        .catch((err) => {
            return null;
        });
}

const updateBMI = async (req, res, next) => {
    let { height, weight } = req.body;

    const data = {
        "height": height,
        "weight": weight,
    };

    const respponse = await instance.post("/profile/bmi-records/update", data, {
        headers: {
            Cookie: `token=${req.session.token}`,
        },
    })
        .then((data) => {
            return data.data;
        })
        .catch((err) => {
            return null;
        });

    res.redirect("/user/profile");
}

const reactMenu = async (id) => {
    try {
        response = await instance.post(`/menus/menuid=${id}/rating/create`);
        return response.data;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}

const getMyMenuData = async (req, res, next) => {
    const data = await instance.get(`/menus/mymenu`, {
        headers: {
            Cookie: `token=${req.session.token}`
        }
    }).then((response) => {
        return response.data;
    }).catch((err) => {
        console.log(err);
        return null;
    });
}


const updateAvatar = async (imgUrl, token) => {
    const respponse = await instance.put("/profile/upload-avatar", {
        avatarImage : imgUrl
    }, {
        headers: {
            Cookie: `token=${token}`,
        },
    })
        .then((data) => {
            return data.data;
        })
        .catch((err) => {
            return null;
        });
    
    
}

const getUserInfo = async (req, res, next) => {
    const userId = req.session.userId;
    const userInfo = await getUserInfoByUserId(userId, req.session.token);

    if(userInfo.success){
        res.send({
            success: true,
            userInfo:{
                name: userInfo.data.name,
                avatarImage: userInfo.data.avatar
            }
        });
    } else {
        res.send({
            success: true,
            userInfo: null
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
    userChangePassword,
    updateProfileUser,
    updateBMI,
    reactMenu,
    getMyMenuData,
    updateAvatar,
    // GET
    getUserInfo,
};