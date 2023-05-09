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
router.get("/Home/MyProfile",(req,res,next)=>{
    res.render("pages/MyProfile.ejs",{
    layout : './layouts/layoutNotFooter.ejs'});
})
router.get("/Home/MyMenu",(req,res,next)=>{
    res.render("pages/MyMenu.ejs"),{
        layout:  './layouts/fulllayout.ejs'
    };
})
router.get("/Home/CreateYourMenu",(req,res,next) => {
    res.render("pages/CreateYourMenu.ejs",{
        layout : './layouts/layoutNotFooter.ejs'});
})
router.put("/Home/putEditProfile/:id", async (req,res,next)=>{
    let [fullname,email,height,weight,age,password] = req.body;
    let id = req.body.params;
    try{
        await axios.put("URL",{
            UserID : id,
            Fullname : fullname,
            email : email,
            Height: height,
            Weight: weight,
            Age : age,
        })
    }
    catch(error){
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
        auth: 0
    });
})

//Create menu
router.get("/createMenu", (req, res, next) => {
    res.render("pages/CreateYourMenu", {
        layout: './layouts/main_layout.ejs',
        title: "Create Menu",
        auth: 0
    });
});

router.get("/detailMenu", (req, res, next) => {
    res.render("pages/detailMenu", {
      layout: './layouts/main_layout.ejs',
      title: "Detail Menu",
      auth: 1
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
router.post('/upload', upload.single('image'), function (req, res, next) {
    // req.file contains information about the uploaded file
    res.render("pages/MyProfile.ejs", {
        layout: './layouts/main_layout.ejs'
    });

});



module.exports = router;