var axios = require('axios');
const multer = require("multer");
const path = require("path");
const fs = require("fs");


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

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {

//         // Uploads is the Upload_folder_name
//         cb(null, "uploads")
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + "-" + Date.now() + ".jpg")
//     }
// })

// // Define the maximum size for uploading
// // picture i.e. 1 MB. it is optional
// const maxSize = 1 * 1000 * 1000;

// var upload = multer({
//     storage: storage,
//     limits: { fileSize: maxSize },
//     fileFilter: function (req, file, cb) {

//         // Set the filetypes, it is optional
//         var filetypes = /jpeg|jpg|png/;
//         var mimetype = filetypes.test(file.mimetype);

//         var extname = filetypes.test(path.extname(
//             file.originalname).toLowerCase());

//         if (mimetype && extname) {
//             return cb(null, true);
//         }

//         cb("Error: File upload only supports the "
//             + "following filetypes - " + filetypes);
//     }

//     // mypic is the name of file attribute
// }).single("foodImage");

// const uploadFile = (req, res, next) => {
//     upload(req, res, async function (err) {

//         if (err) {

//             // ERROR occurred (here it can be occurred due
//             // to uploading image of size greater than
//             // 1MB or uploading different file type)
//             res.send(err)
//         }
//         else {

//             // SUCCESS, image successfully uploaded
//             const imgurUpload = require("../controllers/imgur.controller");
//             let responseData = await imgurUpload(req.file.path);

//             try {
//                 fs.unlinkSync(req.file.path);
//             } catch (error) {
//                 console.log(error);
//             }

//             if (responseData.success) {
//                 res.json({
//                     "success": true,
//                     "notice": "Image uploaded",
//                     "data": {
//                         "link": responseData.data.link
//                     }
//                 });
//             } else {
//                 res.json({
//                     "success": false,
//                     "notice": "Can't upload image file!",
//                     "data": {},
//                 });
//             }

//         }
//     })
// };

module.exports = {
    renderProfileView,
    getBMIwithProfile,
    getBMICurrent,
    renderEditProfileView,
   // uploadFile
};