const express = require('express');
const session = require('express-session'); // session cookies
const passport = require('passport'); // authentication for Google Users
require('dotenv').config(); // Environment Variables
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const User = require('./models/user');
const fs = require('fs');

const port = process.env.LOCAL_HOST;

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//Session Cookies Method set up for 24hours.
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day Cookie.
    },
  })
);

app.use('/users', userRoutes);

// Sessions Cookies
app.use(passport.initialize());
app.use(passport.session());

const mongoURI = process.env.MONGO_URI;

// Establishing a connection to the MongoDB through the MONGO URI
mongoose.connect(mongoURI)
  .then(() => {
    console.log('MongoDB connection established ...');
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1); // Exit process with failure
  });

// Method for inserting and verifying the data.
app.post("/insert", async (req,res) => {
  try {
    // Array that holds the info of the user.
    const users = 
    [
      {
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
      }
    ];

    // Array to hold info of new users
    const insertedUsers = [];

    // Checks for duplicate emails
    for (const userData of users) {
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        console.log(`User with email ${userData.email} already exists.`);
      } else {
        const newUser = new User(userData);
        await newUser.save();
        console.log(`User with email ${userData.email} inserted.`);
        insertedUsers.push(newUser);
      }
    }

    // Save inserted users to JSON file
    fs.writeFileSync('inserted_users.json', JSON.stringify(insertedUsers, null, 2));
    console.log('Inserted users saved to inserted_users.json');
  } catch (error) {
    console.error('Error with the Insertion of data:', error.message);
  }
});

// Task schema and model
const TaskSchema = new mongoose.Schema({
  text: { type: String, required: true },
});

//DB Model for the Task System.
const Task = mongoose.model("Task",TaskSchema);

//Endpoint to search for a specific task and display it back to the user.
app.get("/tasks", async(req,res) => 
  {
    try
    {
      const tasks = await Task.find();
      res.json(tasks);
    }
    catch(error)
    {
      res.status(501).json({message: error.message});
    }
  });

//Post Request to create a specific task for the user.
app.post("tasks",async(req,res) => 
  {
    const task = new Task(
    {
      text : req.body.text,
    });

    try
    {
      const newTask = await task.save();
      res.status(201).json(newTask);
    }
    catch(error)
    {
      res.status(400).json({message: error.message});
    }
  });

//PUT Request to search for the Task by userID and edit and Save the new task.
  app.put("/tasks/:id", async(req,res) => 
    {
      try
      {
        const task = await Task.findById(req.params.id);
        if(!task)
          {
            return res.status(404).json({message : "Task not Found!"});
          }
       task.text = req.body.text;
       const updatedTask = await task.save();
       res.status(201).json(updatedTask);
      }

      catch(error)
      {
        res.status(400).json({message : error.message});
      }
    });
//DELETE Request to be able to delete the task from the chore list by searching for userID.
app.delete("/task/:id", async(req,res) => 
{
  try
  {
    const task = await Task.findById(req.params.id);
    if(!task)
      {
        return res.status(404).json({message : "Task not Found!"});
      }
    await task.remove();
    res.json({message : "Task has been deleted."});
  }
  catch(error)
  {
    res.status(400).json({message : error.message});
  } 
});

// Post Request to Login a User.
app.post('/login', (req, res) => {
  if (req.isAuthenticated()) {
    res.send('Welcome back!'); // Welcomes a specific user by their name.
  } else {
    res.redirect('/login'); // sends the user back to the login page again.
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
