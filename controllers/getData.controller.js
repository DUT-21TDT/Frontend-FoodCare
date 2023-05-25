const axios = require('axios');
const instance = axios.create({baseURL: `${process.env.API_URL}/public`});

const getFoods = async (req, res) => {
    try {
        let responseData = await instance.get("/foods"
        ).then(response => {
            return response.data;
        }).catch((err) => {
            console.log({message: err});
            throw err;
        });

        res.send(responseData);
        
    } catch (error) {
        console.log({message: error})
        res.status(500);
    }
}

const getMenus= async (req, res) => {
    try {
        let responseData = await instance.get("/menus"
        ).then(response => {
            return response.data;
        }).catch((err) => {
            console.log({message: err});
            throw err;
        });

        res.send(responseData);
        
    } catch (error) {
        console.log({message: error})
        res.status(500);
    }
}

module.exports = {
    getFoods, getMenus
}