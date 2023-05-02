var express = require('express');
var router = express.Router();
var axios = require('axios');
var multer = require('multer');


router.get("/", (req, res, next) => {
    res.render("pages/homepage.ejs", {
        layout:  './layouts/fulllayout.ejs',
        title: "Dashboard"});
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
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,__path_views + "/assets/images/imgAvatar"); 
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); 
    }
  });
  const upload = multer({ storage: storage });
router.post('/upload', upload.single('image'), function (req, res, next) {
    // req.file contains information about the uploaded file
    res.render("pages/MyProfile.ejs",{
    layout : './layouts/layoutNotFooter.ejs'});
    
  });
router.get("/dashboard", (req, res, next) => {
    res.render("pages/dashboard", {
        title: "Dashboard",
        name: "dashboard",
    });
});

router.get("/Accounts", (req, res, next) => {
    res.render("pages/accounts", {
        title: "Quản lý tài khoản",
        name: "accounts",
    });
});


router.get("/Foods", (req, res, next) => {
    res.render("pages/foods", {
        title: "Quản lý thực phẩm",
        name: "foods",
    });
});

router.get("/FoodMenu", (req, res, next) => {
    res.render("pages/foodMenu.ejs", {
        title: "Quản lý thực đơn",
        name: "foodMenu",
    });
});

module.exports = router;