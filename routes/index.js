var express = require('express');
var mongoose = require("mongoose");
var router = express.Router();
/* GET home page. */
var encrypt = require("mongoose-encryption");



const userSchema = new mongoose.Schema ( {
  email: String,
  password: String
});
// const secret = "bhai.";
// console.log(process.env.SECRET)
userSchema.plugin(encrypt,{secret:process.env.SECRET,encryptedFields: ['password'] });



const User = new mongoose.model("User",userSchema);




router.get('/', function(req, res, next) {
  res.render('home');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});



router.post('/register', function(req, res, next) {
  const newUser = new User({
    email:req.body.username,
    password:req.body.password
  });
  newUser.save((err)=>{if (err){console.log(err)}else{
    res.render('secrets');
  }})
});


router.post('/login', function(req, res, next) {
  const {username, password} = req.body;
  User.findOne({email:username})
  .then((result)=>{
    if (result){
      if (result.password === password){
        // console.log(password)
        res.render("secrets");
      }
    }
  })
  .catch((err)=>{console.log(err)})

  // console.log(User)

  // res.render('screts');
});



router.get('/logout', function(req, res, next) {
  res.render('home');
});


// router.get('/secrets', function(req, res, next) {
//   res.render('secrets');
// });




module.exports = router;