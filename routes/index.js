var express = require('express');
var mongoose = require("mongoose");
var router = express.Router();
/* GET home page. */
// var encrypt = require("mongoose-encryption");
// var md5 = require("md5")
var bcrypt = require("bcrypt");
var saltRounds = 10;

const userSchema = new mongoose.Schema ( {
  email: String,
  password: String
});
// const secret = "bhai.";

// userSchema.plugin(encrypt,{secret:process.env.SECRET,encryptedFields: ['password'] });



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
  bcrypt.hash(req.body.password,saltRounds,(err,hash)=>{
    const newUser = new User({
    email:req.body.username,
    password:hash
  });
  newUser.save((err)=>{if (err){console.log(err)}else{
    res.render('secrets');
  }})})
});


router.post('/login', function(req, res, next) {
  const {username, password} = req.body;
  User.findOne({email:username})
  .then((result)=>{
    if (result){
      bcrypt.compare(password,result.password,function(err,resultt){
        if (resultt == true){
          res.render("secrets")
        }
      })
      
    };
  })
  .catch((err)=>{console.log(err)})
});



router.get('/logout', function(req, res, next) {
  res.render('home');
});




module.exports = router;