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

    var foodElements = [];
    var index = 0;
    await Promise.all(
        menuInfo.data.foods.list.map(async (food) => {
            const foodInfo = await getFoodDetailById(food.foodid);
            nutrition.energy += foodInfo.data.energy;
            nutrition.carbs += foodInfo.data.carbohydrate;
            nutrition.lipid += foodInfo.data.lipid;
            nutrition.protein += foodInfo.data.protein;

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
    const dataRating = await getAllRatingsByMenuId(req.session.token, menuId);
    const userId = req.session.userId;
    const userInfo = await getUserInfoByUserId(userId, req.session.token);

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
};
