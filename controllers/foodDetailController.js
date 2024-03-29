var axios = require('axios');
const { response } = require('express');

const instance = axios.create({ baseURL: `${process.env.API_URL}/` });

const renderFoodDetailView = async (req, res, next) => {
    const foodId = req.params.id;

    const foodInfo = await getFoodDetailById(foodId);

    res.render("pages/FID_New_V2", {
        layout: './layouts/main_layout.ejs',
        title: "Detail food",
        data: foodInfo.data,
    });
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

const getFoodInfoById = async (req, res) => {
    const id = req.query.id;
    try {
        let responseData = await instance.get(`/public/foods/${id}`
        ).then(response => {
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
};

const renderMenuDetailView = async (req, res, next) => {
    const menuId = req.params.menuid;

    const menuInfo = await getMenuDetailById(menuId);

    var nutrition = {
        energy: 0,
        carbs: 0,
        lipid: 0,
        protein: 0,
        vitamins: "",
        minerals: "",
    };

    console.log(menuInfo);

    var foodElements = [];
    var index = 0;
    await Promise.all(
        menuInfo.data.foods.list.map(async (food) => {
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
    let userId;
    let userInfo = {
        list: []
    };
    var dataRatingTmp;
    let dataRating = {
        list: []
    };

    var ArrayUserInfo = [];

    if (req.session.token != null) {
        userId = req.session.userId;
        userInfo = await getUserInfoByUserId(userId, req.session.token);
        dataRating = await getAllRatingsByMenuId(req.session.token, menuId);
        dataRatingTmp = dataRating.data;
        if (dataRatingTmp != null) {
            for (var i = 0; i < dataRatingTmp.list.length; i++) {
                var userInfoTmp = await getUserInfoByUserId(dataRatingTmp.list[i].userid, req.session.token);
                ArrayUserInfo.push(userInfoTmp);
            }
        }
    }




    res.render("pages/detailMenu", {
        layout: './layouts/main_layout.ejs',
        title: "Detail menu",
        data: menuInfo.data,
        nutrition: nutrition,
        foodElements: foodElements,
        userInfo: userInfo.data,
        dataRating: dataRating.data,
        ArrayUserInfo: ArrayUserInfo,
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


const getMenuDetailById = async (id) => {
    try {
        const response = await instance.get(`/public/menus/menuid=${id}`);
        return response.data;
    } catch (err) {
        console.error(err);
        return null;
    }
};



module.exports = {
    renderFoodDetailView,
    renderMenuDetailView,
    getFoodInfoById,
};
