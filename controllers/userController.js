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
                "success": false,
            }
        });
        if (responseData.data) {
            res.json({
                success: true,
                message: "Change Password Successfully!",
                data: responseData.data
            });
        }
        else {
            res.json({
                success: false,
                message: "Incorrect current password!",
                data: null,
            });
        }
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
    if (response.data) {
        res.json({
            success: true,
            message: "Update Profile Successfully!",
            data: response.data
        });
    }
    else {
        res.json({
            success: false,
            message: "Update Profile Failed!",
            data: null,
        });
    }
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
        const response = await instance.delete(`/menus/menuid=${id}/delete`,
            {
                headers: {
                    Cookie: `token=${req.session.token}`,
                },
            }).then(res => {
                return res.data;
            });

        res.send(response);
    } catch (err) {
        console.error(err);
        return null;
    }
};

const likeMenuById = async (req, res) => {
    try {
        let id = req.params.id;
        const response = await instance.post(`/ratings/menuid=${id}/create`, {
            favorite: 1,
            comment: null,
        }, {
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

const unLikeMenuById = async (req, res) => {
    try {
        var id = req.params.id;
        var ratingId = req.body.data;
        console.log(ratingId);
        const response = await instance.post(`/ratings/menuid=${id}/delete`, {

        },
            {
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

const userCreateMenu = async (req, res, next) => {
    let menuName = req.body.menuName;
    let foodsList = req.body.foodsList;
    let creator = req.body.creator;
    let menuImage = req.body.menuImage;

    const data = {
        "menuName": menuName,
        "foodsList": foodsList,
        "creator": creator,
        "menuImage": menuImage,
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
    if (response.data) {
        res.json({
            success: true,
            message: "Create Your Menu Successfully!",
            data: response.data
        });
    }
    else {
        res.json({
            success: false,
            message: "Create Your Menu Failed!",
            data: null,
        });
    }


}
const getAllRatingsByMenuId = async (token, id) => {
    try {
        const response = await instance.get(`/ratings/menuid=${id}/all`, {
            headers: {
                Cookie: `token=${token}`
            }
        });
        return response.data;
    } catch (err) {
        console.error(err);
        return null;
    }
}

const renderOwnMenuDetailView = async (req, res, next) => {
    const ownMenuId = req.params.menuid;

    const ownMenuInfo = await getOwnMenuDetailById(ownMenuId, req);

    var nutrition = {
        energy: 0,
        carbs: 0,
        lipid: 0,
        protein: 0,
        vitamins: "",
        minerals: "",
    };

    var foodElements = [];
    var index = 0;
    await Promise.all(
        ownMenuInfo.data.foods.list.map(async (food) => {
            const foodInfo = await getFoodDetailById(food.foodid);
            if (foodInfo.data.energy != null) nutrition.energy += Number((foodInfo.data.energy).toFixed(2)) * food.amount;
            if (foodInfo.data.carbohydrate != null) nutrition.carbs += Number((foodInfo.data.carbohydrate).toFixed(2)) * food.amount;
            if (foodInfo.data.lipid != null) nutrition.lipid += Number((foodInfo.data.lipid).toFixed(2)) * food.amount;
            if (foodInfo.data.protein != null) nutrition.protein += Number((foodInfo.data.protein).toFixed(2)) * food.amount;
            nutrition.carbs = Number((nutrition.carbs).toFixed(2));
            nutrition.energy = Number((nutrition.energy).toFixed(2));
            nutrition.lipid = Number((nutrition.lipid).toFixed(2));
            nutrition.protein = Number((nutrition.protein).toFixed(2));

            if (foodInfo.data.vitamins) {
                const vitamins = foodInfo.data.vitamins.split(',').map((vitamin) => vitamin.trim());
                vitamins.forEach((vitamin) => {
                    if (!nutrition.vitamins.includes(vitamin)) {
                        nutrition.vitamins += (nutrition.vitamins.length > 0 ? ", " : "") + vitamin;
                    }
                });
            }

            if (foodInfo.data.minerals) {
                const minerals = foodInfo.data.minerals.split(',').map((mineral) => mineral.trim());
                minerals.forEach((mineral) => {
                    if (!nutrition.minerals.includes(mineral)) {
                        nutrition.minerals += (nutrition.minerals.length > 0 ? ", " : "") + mineral;
                    }
                });
            }

            // Add foodName and foodImage to foodElements
            foodElements[index] = {
                foodName: foodInfo.data.foodname,
                foodAmount: food.amount,
                foodId: foodInfo.data.foodid,
            };

            index++;
        })
    );

    console.log(foodElements);
    const userId = req.session.userId;
    const userInfo = await getUserInfoByUserId(userId, req.session.token);
    const dataRating = await getAllRatingsByMenuId(req.session.token, ownMenuId);

    var ArrayUserInfo = [];
    var dataRatingTmp = dataRating.data;
    if (dataRatingTmp != null) {
        for (var i = 0; i < dataRatingTmp.list.length; i++) {
            const userInfoTmp = await getUserInfoByUserId(dataRatingTmp.list[i].userid, req.session.token);
            ArrayUserInfo.push(userInfoTmp);
        }
    }


    res.render("pages/detailMenu", {
        layout: './layouts/main_layout.ejs',
        title: "Detail menu",
        data: ownMenuInfo.data,
        nutrition: nutrition,
        foodElements: foodElements,
        userInfo: userInfo.data,
        dataRating: dataRating.data,
        ArrayUserInfo: ArrayUserInfo,
    });
};




const getOwnMenuDetailById = async (id, req) => {
    try {
        const response = await instance.get(`/menus/menuid=${id}`, {
            headers: {
                Cookie: `token=${req.session.token}`
            }
        });
        return response.data;
    } catch (err) {
        console.error(err);
        return null;
    }
};

const getFoodDetailById = async (id) => {
    try {
        const response = await instance.get(`/public/foods/${id}`);
        return response.data;
    } catch (err) {
        console.error(err);
        return null;
    }
};
const getViewEditMenu = async (req, res, next) => {
    var id = req.params.id;
    const ownMenuInfo = await getOwnMenuDetailById(id, req);

    var nutrition = {
        energy: 0,
        carbs: 0,
        lipid: 0,
        protein: 0,
        vitamins: "",
        minerals: "",
    };

    var foodElements = [];
    var index = 0;
    await Promise.all(
        ownMenuInfo.data.foods.list.map(async (food) => {
            const foodInfo = await getFoodDetailById(food.foodid);
            if (foodInfo.data.energy != null) nutrition.energy += Number((foodInfo.data.energy).toFixed(2)) * food.amount;
            if (foodInfo.data.carbohydrate != null) nutrition.carbs += Number((foodInfo.data.carbohydrate).toFixed(2)) * food.amount;
            if (foodInfo.data.lipid != null) nutrition.lipid += Number((foodInfo.data.lipid).toFixed(2)) * food.amount;
            if (foodInfo.data.protein != null) nutrition.protein += Number((foodInfo.data.protein).toFixed(2)) * food.amount;
            nutrition.carbs = Number((nutrition.carbs).toFixed(2));
            nutrition.energy = Number((nutrition.energy).toFixed(2));
            nutrition.lipid = Number((nutrition.lipid).toFixed(2));
            nutrition.protein = Number((nutrition.protein).toFixed(2));

            if (foodInfo.data.vitamins) {
                const vitamins = foodInfo.data.vitamins.split(',').map((vitamin) => vitamin.trim());
                vitamins.forEach((vitamin) => {
                    if (!nutrition.vitamins.includes(vitamin)) {
                        nutrition.vitamins += (nutrition.vitamins.length > 0 ? ", " : "") + vitamin;
                    }
                });
            }

            if (foodInfo.data.minerals) {
                const minerals = foodInfo.data.minerals.split(',').map((mineral) => mineral.trim());
                minerals.forEach((mineral) => {
                    if (!nutrition.minerals.includes(mineral)) {
                        nutrition.minerals += (nutrition.minerals.length > 0 ? ", " : "") + mineral;
                    }
                });
            }

            // Add foodName and foodImage to foodElements
            foodElements[index] = {
                foodName: foodInfo.data.foodname,
                foodAmount: food.amount,
                foodId: foodInfo.data.foodid,
            };

            index++;
        })
    );

    console.log(foodElements);


    res.render("pages/EditYourMenu", {
        layout: './layouts/main_layout.ejs',
        title: "Edit Your Menu",
        data: ownMenuInfo.data,
        nutrition: nutrition,
        foodElements: foodElements,
    });
}
// const getDataEditMenuByMenuId = async (menuId,token)=>{
//     const dataByMenuId = await instance.get(`/menus/menuid=${menuId}`, {
//         headers: {
//             Cookie: `token=${token}`
//         }
//     }).then((response) => {
//         return response.data;
//     }).catch((err) => {
//         return null;
//     });

//     return dataByMenuId;

// }
const userRatingMenu = async (req, res, next) => {
    let id = req.params.id;
    let comment = req.body.comment;
    var data = {
        favorite: 0,
        comment: comment,
    };
    const response = await instance.post(`/ratings/menuid=${id}/create`, data, {
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
const updateMenu = async (req, res, next) => {
    let menuid = req.params.id;
    let menuName = req.body.menuName;
    let foodsList = req.body.foodsList;
    let menuImage = req.body.menuImage;

    let data = {
        "menuid": menuid,
        "menuName": menuName,
        "foodsList": foodsList,
        "menuImage": menuImage,
    }
    const response = await instance.put(`/menus/menuid=${menuid}/update`, data, {
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
    if (response) {
        res.json({
            success: true,
            message: "Update Your Menu Successfully!",
        });
    }
    else {
        res.json({
            success: false,
            message: "Update Your Menu Failed!",
        });
    }


}

//=======
var updateImageProfile = async (req, res, next) => {
    try {
        const imgUrl = req.body.imgUrl;
        console.log(imgUrl);
        await updateAvatar(imgUrl, req.session.token);
        res.json({
            success: true,
            message: "update Image Profile successfully."
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const getMenus = async (req, res) => {
    try {
        let responseData = await instance.get("/menus", {
            headers: {
                Cookie: `token=${req.session.token}`,
            },
        }).then(response => {
            return response.data;
        }).catch((err) => {
            console.log({ message: err });
            throw err;
        });
        res.send(responseData);
    } catch (error) {
        console.log({ message: error })
        res.status(500);
    }
}

const publishMenu = async (req, res) => {
    try {
        var id = req.params.menuid;

        console.log(req.session.token);

        const response = await instance.put(`/menus/menuid=${id}/propose`,
            {}
            ,
            {
                headers: {
                    Cookie: `token=${req.session.token}`,
                },
            }).then(res => {
                if (res.status === 403) {
                    return null;
                }
                return res.data;
            });

        res.send(response);
    } catch (err) {
        console.error(err);
        res.status(403).send('In queue');
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
    getUserInfo,
    deleteMenuDetailById,
    likeMenuById,
    unLikeMenuById,
    userCreateMenu,
    userRatingMenu,
    getViewEditMenu,
    renderOwnMenuDetailView,
    updateMenu,
    updateImageProfile,
    getMenus,
    publishMenu,
};