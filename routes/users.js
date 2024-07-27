const app = require("express");
const user = require("../models/user");

const router = app.Router();

router.get("/", async (req,res)=> 
{
try //Searches for all the users and sends them back in a JSON.
{
  const users = await user.find();
  res.json(users);
}
catch(err) // Sends an error message back if there is an error.
{
  res.status(500).json({message : err.message, });
}
});

//Post Request to Create User
router.post("/", async (req,res) => 
  {
  
  const user = 
   new User ({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password, 
    });

  try //Saves the user after it's been initialised.
  {
    const newUser = await user.save();
    res.status(201).json(newUser); 
  }
  catch
  {
    res.status(500).json({message : err.message,});
  }
  });


module.exports = router;