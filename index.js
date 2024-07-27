const express = require('express');
const session = require('express-session'); //session cookies
const passport = require('passport');// authentication for Google Users
require('dotenv').config(); // Environment Variables
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');


const port = process.env.LOCAL_HOST;

const app = express();

//MiddleWare
app.use(express.json());
app.use(express.urlencoded({extended : true,}));
app.use(express.static("public"));

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

//Sessions Cookies
app.use(passport.initialize());
app.use(passport.session());

const mongoURI = process.env.MONGO_URI;

//Establishing a connection to the MongoDB through the MONGO URI
mongoose.connect(mongoURI)
  .then(() => console.log("MongoDB connection established ..."))
  .catch(err => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1); // Exit process with failure
  });

//Post Request to Login a User.
app.post('/login', (req,res) =>
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
app.post("/tasks", (req,res) =>
  {

  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});