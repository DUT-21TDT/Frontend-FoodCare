var express = require('express');
var router = express.Router();
var axios = require('axios');
var multer = require('multer');

// Homepage
router.get("/", (req, res, next) => {
    res.render("pages/homepage", {
        layout: './layouts/main_layout.ejs',
        title: "Home",
        auth: 0
    });
});
router.get("/MyProfile", (req, res, next) => {
    res.render("pages/MyProfile.ejs", {
        layout: './layouts/layoutNotFooter.ejs'
    });
})
router.get("/MyMenu", (req, res, next) => {
    res.render("pages/MyMenu.ejs"), {
        layout: './layouts/fulllayout.ejs'
    };
})
router.get("/CreateYourMenu", (req, res, next) => {
    res.render("pages/CreateYourMenu.ejs", {
        layout: './layouts/layoutNotFooter.ejs'
    });
})
router.put("/EditProfile/:id", async (req, res, next) => {
    let [fullname, birth, gender] = req.body;
    let id = req.body.params;
    try {
        await axios.put("URL", {
            name: fullname,
            dateofbirth: birth,
            gender: gender
        }).then(res => {
            console.log(res.message);
        }).catch((err) => {
            console.log({ message: err });
        });
    }
    catch (error) {
        console.log(error);
        res.status(500);
    }
})
router.get("/dashboard", (req, res, next) => {
    res.render("pages/dashboard", {
        title: "Dashboard",
        name: "dashboard",
    });
});



//My menu
router.get("/myMenu", (req, res, next) => {
    res.render("pages/MyMenu", {
        layout: './layouts/main_layout.ejs',
        title: "My Menu",
    });
})

//Create menu
router.get("/createMenu", (req, res, next) => {
    res.render("pages/CreateYourMenu", {
        layout: './layouts/main_layout.ejs',
        title: "Create Menu",
    });
});

router.get("/detailMenu", (req, res, next) => {
    res.render("pages/detailMenu", {
        layout: './layouts/main_layout.ejs',
        title: "Detail Menu",
    });
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __path_views + "/assets/images/imgAvatar");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), async function (req, res, next) {
    // req.file contains information about the uploaded file
    var img = req.image;
    try {
        await axios.put("/profile/upload-avatar", {
            avatar: img
        }).then(res => {
            return res.data;
        }).catch((err) => {
            console.log({ message: err });
        });

        res.redirect("/profile");
    }
    catch (error) {
        console.log(error);
        res.status(500);
    }

});



module.exports = router;