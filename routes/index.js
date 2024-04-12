var express = require('express');
var router = express.Router();
var db = require('../models');
const path = require('path');
const multer = require('multer');
const {checklogin, newUser} = require('../service/userService');
const { generateToken, verifyToken, decodeToken } = require('../service/jwtServices');




const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const uploader = multer({ storage: storage });
db.sequelize.sync().then(() => console.log("Connected To Database")).catch((e) => console.log('Error While Connection to Database'+ e));

/* GET home page. */

router.get('/products', async (req, res) => {
  try {
      // Fetch all products from the database
      const products = await db.Product.findAll();
      
      // Send the products as JSON response
      res.json(products);
  } catch (err) {
      console.error('Error fetching products:', err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/getPostData',async function(req,res,next){
  console.log("btrrebrbe\n\n\n\n\n thethht");
  try {
    const data = await db.posts.findAll({order:[['postid','DESC']]});
    console.log("Retrieved data:", data);
    res.json(data);
} catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ error: "Internal server error" });
}
  
});
router.get('/getConnectionsData',async function(req,res,next){
  console.log("btrrebrbe\n\n\n\n\n thethht");
  try {
    const data = await db.users.findAll();
    console.log("Retrieved data:", data);
    res.json(data);
} catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ error: "Internal server error" });
}

  
});
router.get('/', function (req, res, next) {
  res.render('splashScreen');
});
router.get('/login', function (req, res, next) {
  res.render('login');
});
router.get('/createAccount', function (req, res, next) {
  res.render('createAccount');
});
router.get('/home',async function (req, res, next) {
  const token = req.query.token;
  if(token){
    console.log(token);
    let user = await decodeToken(token);
    console.log("User is decoded");
    console.log(user);
  res.render("home",{data: user.user});}
  else{
    res.end("Error");
  }
});
router.get("/forgetPassword", function (req, res, next) {
  res.render('forgetPassword');
});
router.get("/setPassword", function (req, res, next) {
  res.render('setPassword');
});
router.post("/login",async function(req,res,next){
  console.log("dnoenwoeifnoiwenfwo");
  let email = req.body.email;
  let password = req.body.password;
  let user = await checklogin(email,password);
  console.log("dnoenwoeifnoiwenfwo");
  if (user) {
    // Generate JWT token with user data
    const token = generateToken(user);
    // Send token as JSON response
    res.status(200).json({ token });
} else {
    res.status(401).json({ message: 'Invalid username or password' });
}

  
});
router.post("/createPost",verifyToken,uploader.single('pic'),async function(req,res,next){
  let post = req.body;
  let user = req.user;

  console.log(post);
  console.log(user);
  post.postMedia = req.file.path;
  post.userid = user.userid;
  post.username = user.username;
  post.userPhoto = user.photoUrl;
  var result = await db.posts.create(post);
  if(result){
    res.status(200).json({ post });
  }
  else{
    res.status(401).json({ message: 'Error' });
  }
 
  // post.userid= user.userid;
  // post.username = user.username;
  // post.userPhoto = user.photoUrl;
  
});

router.post("/register", uploader.single('pic'),async function (req, res, next) {
  console.log('req.file:' + req.file);
  // user.pic = req.file.path;
  let user = req.body;
  user.photoUrl = req.file.path;
  let result = await newUser(user);
  if (result) {
    console.log(result);
    res.render("home",{data: result});
    
  }
  else {
    res.end("Error While Creating User")
  }
});

module.exports = router;
