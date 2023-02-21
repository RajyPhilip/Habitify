const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy ;
const User = require("../models/user");


passport.use(new GoogleStrategy({
        clientID: '277782129196-lbd5j4mo202he09p2fe90u2vg87v7fe0.apps.googleusercontent.com',
        clientSecret : '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',
        callbackURL : 'http://localhost:8000/user/auth/google/callback',

    },
    function(accessToken , refreshToken , profile , done){


        // find the user 
        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
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
                    email:profile.emails[0].value,
                    password:"rock"
                },function(err,user){
                    if(err){
                        console.log("ERROR in creating user google stratergy-passport",err);
                        return ;
                    }
            
                    return(null,user);
                });
            }
        });
    }
));