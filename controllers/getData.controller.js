const axios = require('axios');
const instance = axios.create({ baseURL: `${process.env.API_URL}` });

const getFoods = async (req, res) => {
    try {
        let responseData = await instance.get("/public/foods"
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
}

const getMenus = async (req, res) => {
    try {
        let responseData = await instance.get("/public/menus"
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
}

const getTags = async (req, res) => {
    try {
        let responseData = await instance.get("/public/tags"
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
}

const getFoodsByTags = async (req, res) => {
    try {
        const tagids = req.query.tagids;

        let responseData = await instance.get("/public/foods/tag-filter", { data: { tagids: tagids } }
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
}



module.exports = {
    getFoods, getMenus, getTags, getFoodsByTags
}