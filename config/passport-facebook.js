const passport = require('passport');
const  FacebookStrategy = require('passport-facebook').Strategy ;
const User = require('../models/user');

passport.use(new FacebookStrategy({
    clientID: "866326104576010",
    clientSecret: "02034973dedf9cd8edac026b2fbe02dc",
    callbackURL: "http://localhost:8000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    const email=`fb${profile.id}@facebook.com`
    // find the user 
    User.findOne({email: email}).exec(function(err,user){
        if(err){
            console.log("ERROR in google stratergy passport",err);
            return ;
        }
        if(user){
            // if found, set this user as req.user  

            return done(null,user);
        }else{

            //if not found, create the user and set it as req.user which means(signin that user)
            User.create({ 
                name: profile.displayName,
                email:email,
                password:"rock"
            },function(err,user){
                if(err){
                    console.log("ERROR in creating user google stratergy-passport",err);
                    return ;
                }

                return(null,user);
            });
        }
    })}
));