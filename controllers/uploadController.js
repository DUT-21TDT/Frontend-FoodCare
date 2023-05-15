var express = require('express');
var router = express.Router();
var axios = require('axios');
var multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __path_views + "/assets/images/imageAvatar");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });
router.put('/upload', upload.single('image'), async function (req, res, next) {
    // req.file contains information about the uploaded file
    try {
        await axios.put("/profile/upload-avatar", {
            
        }).then(res => {
            console.log(res.data.url);
            return res.data;
        }).catch((err) => {
            console.log({ message: err });
        });

        if(data.success) {
            redirect("/user/profile");
        }

    }
    catch (error) {
        console.log(error);
        res.status(500);
    }

});

module.exports = {
    uploadFile,
}