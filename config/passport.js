const passport = require("passport");
const LocalStrategy = require('passport-local');
const User = require("../models/user");
const bcrypt = require('bcrypt');


//Local Method of logging into the server.
passport.use(new LocalStrategy(
  async(name, password, done) => 
    {
      try
      {
        const user = await User.findOne({username: name,}); //search for a user with a specific username and returns it as a JSON.
        if(!user)
          {
            return done(null, false, {message: "This is an invalid Username, Please Try Again!"});
          }
        const isMatch = await bcrypt.compare(password, User.password)
        if(!isMatch)
        {
            return done(null, false, {message: "Incorrect Password"});
        }

        return done(null, user);
      }
      catch(error)
      {
        return done(error);
      }
    }
));

//Serialises the User from session.
passport.serializeUser((user,done) => 
  {
    done(null, user.id);
  });

//Deserialises User from session.
passport.deserializeUser( async(id,done)=> 
  {
    try
    {
    const user = await User.findById(id);
    done(null,user);
    }
    catch(error)
    {
      done(error);
    }
  });

export default passport;