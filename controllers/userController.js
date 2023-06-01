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
    const userId = req.session.userId;

    const userInfo = await getUserInfoByUserId(userId, req.session.token);
    res.render("pages/CreateYourMenu", {
        layout: './layouts/main_layout.ejs',
        title: "New menu",
        userInfo: userInfo.data,
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
    if (BMIs.data.count) {

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
    if (BMIs.data) {
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
    try {
        let responseData = await instance.get(`/menus/mymenu`, {
            headers: {
                Cookie: `token=${req.session.token}`
            }
        }).then(response => {
            return response.data;
        }).catch((err) => {
            console.log(err);
            return null;
        });

        res.send(responseData);

    } catch (error) {
        console.log({ message: error })
        res.status(500);
    }
}



const updateAvatar = async (imgUrl, token) => {
    const respponse = await instance.put("/profile/upload-avatar", {
        avatarImage: imgUrl
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

    if (userInfo.success) {
        res.send({
            success: true,
            userInfo: {
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

const deleteMenuDetailById = async (req, res) => {
    try {
        var id = req.params.id;
        const response = await instance.delete(`/menus/menuid=${id}/delete`, {
            headers: {
                Cookie: `token=${req.session.token}`,
            },
        }).then(res => {
            return res.data;
        });
    } catch (err) {
        console.error(err);
        return null;
    }

};

const userCreateMenu = async(req,res,next) =>{
    let menuName = req.body.menuName;
    let foodsList = req.body.foodsList;
   let creator = req.body.creator;
   let menuImage = req.body.menuImage;

    const data = {
        "menuName": menuName,
        "foodsList": foodsList,
        "creator":creator,
        "menuImage":menuImage,
    };
    const response = await instance.post("/menus/create", data, {
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
const userRatingMenu = async(req,res,next)=>{
    let id = req.params.id;
    let favorite = req.body.favorite;
    let comment = req.body.comment;
    let data = {
        "favorite":favorite,
        "comment":comment,
    };
    const response = await instance.post(`/menus/menuid=${id}/ratings/create`, data, {
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

const getDataEditMenuByMenuId = async (menuId,token)=>{
    const dataByMenuId = await instance.get(`/menus/menuid=${menuId}`, {
        headers: {
            Cookie: `token=${token}`
        }
    }).then((response) => {
        return response.data;
    }).catch((err) => {
        return null;
    });

    return dataByMenuId;

}

const getViewEditMenu = async (req,res,next) =>{
    var id = req.params.id;
    const dataByMenuId = await getDataEditMenuByMenuId(id,req.session.token);
    res.render("pages/EditYourMenu", {
        layout: './layouts/main_layout.ejs',
        title: "Edit Your Menu",
        data: dataByMenuId.data,
    });
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
    getUserInfo,
    deleteMenuDetailById,
    userCreateMenu,
    userRatingMenu,
    getViewEditMenu,
};