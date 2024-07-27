const app = require("express");
const bcrypt = require('bcrypt'); // bycrypt to salt the passswords
const user = require("../models/user");

const router = app.Router();

const saltRounds = 12;

//Post Request to Register User
router.post("/register", async (req,res) => 
  {
  
  const {name, email, password} = req.body;

  try //Saves the user after it's been initialised.
  {
    // Hashes and salt the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new user({ name, email, password: hashedPassword });
    await newUser.save();
    
    res.status(201).json(newUser); 
  }
  catch
  {
    res.status(500).json({message : err.message,});
  }
  });



//Post Request to Login a User.
router.post('/login', passport.authenticate('local', 
  {
    successRedirect: '/profile', //redirects user to their profile, if they, have an account.
    failureRedirect: '/login',// redirects user back to login page if info is incorrect or there is no existing account.
  }));

//Logout User Route
  router.get('/logout', (req,res) => 
    {
      req.logout();
      req.redirect('/');// Redirect user to the home page
    });

//Countermeasure to verfiy that all users have accounts.
  router.get("/profile",(req,res) => 
    {
      if(!req.isAuthenticated)
        {
          res.status(401).json({message : "You don't have access to this profile!"}); //Sends error message for lack of access to the account.
        }
        res.json("/user");// Send's user data.
    });


module.exports = router;