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
        const response = await instance.get(`/foods/${id}`);
        return response.data;
    } catch (err) {
        console.error(err);
        return null;
    }
};

module.exports = {
    renderFoodDetailView,
};