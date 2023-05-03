// var express = require('express');
// var router = express.Router();
// var axios = require('axios');

// router.get("/", (req, res, next) => {
//     res.render("pages/homepage.ejs",
//      {
//         layout:  './layouts/layoutLogin.ejs'
//       });
        
// });
// router.post("/signup", async (req,res,next) =>{
//   let [fullname,email,username,birth,sex,password] = req.body;
//   try{
//         let response =  await axios.post("URL",{
//           Name : fullname,
//           email : email,
//           Username : username,
//           DateofBirth : birth,
//           Gender : sex,
//           Password : password,
//         })

//         if(response.status == 200) {
//           res.render("pages/homepage.ejs",
//           {
//              layout:  './layouts/layoutLogin.ejs'
//            });
//         }
//         else {
//           alert("Đã đăng ký thành công");
//           res.status(500);
//         }
//   }catch(error){
//       res.status(500);
//   }
// })


// module.exports = router;