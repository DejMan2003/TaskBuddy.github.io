const express = require('express');
const session = require('express-session'); //session cookies
const passport = require('passport');// authentication for Google Users
require('dotenv').config(); // Environment Variables
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');


const port = process.env.LOCAL_HOST || 3001;

const app = express();

//MiddleWare
app.use(express.json());
app.use(express.urlencoded({extended : true,}));
app.use(express.static("public"));

//Sessions Cookies
app.use(passport.initialize());
app.use(passport.session());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: 
    {
      maxAge: 1000 * 60 * 60 *24, // 1 day Cookie.
    }
  })
);

app.use("/users", userRoutes);

const mongoURI = process.env.MONGO_URI;

//Establishing a connection to the MongoDB through the MONGO URI
mongoose.connect(mongoURI)
  .then(() => console.log("MongoDB connection established ..."))
  .catch(err => console.log(err));

//Post Request to Login a User.
router.post('/login', (req,res) =>
  {
    if(req.isAuthenticated())
      {
        res.send("Welcome back !"); //Welcomes a specific user by their name.
      }
      else
      {
        res.redirect('/login'); // sends the user back to the login page again.
      }
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});