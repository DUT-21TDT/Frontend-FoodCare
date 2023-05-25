var axios = require('axios');

const instance = axios.create({ baseURL: `${process.env.API_URL}/` });

const renderFoodDetailView = async (req, res, next) => {
    const foodId = req.params.id;

    const foodInfo = await getFoodDetailById(foodId);

    console.log(foodInfo);

    res.render("pages/Food_information_detail", {
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


    res.render("pages/detailMenu", {
        layout: './layouts/main_layout.ejs',
        title: "Detail menu",
        data: menuInfo.data,
    });
};

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