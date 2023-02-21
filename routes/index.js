const express = require('express');
const { landingPage,home, details  } = require('../controllers/home_controller');
const { signInPage, signUpPage,signUp,logIn,logOut,addHabit,deleteHabit,updateStatus } = require('../controllers/user_controller');
const router = express.Router();
const localPassport = require('../config/passport-local');
const passport = require('passport');



//routes
router.get('/', landingPage )
router.get('/home', home )
router.post('/update/:habitId/:recordId',updateStatus)
router.get('/details/:habitId', details )



router.get('/sign-in',signInPage)
router.get('/sign-up',signUpPage)
router.get('/logout',logOut)
router.post('/user/create',signUp)
router.post('/user/login',passport.authenticate('local',{failureRedirect : '/sign-in'}),logIn)

// function routers 
router.post('/user/addHabit',addHabit)
router.post('/user/delete/:id',deleteHabit);





// google routes 
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/user/auth/google/callback', passport.authenticate('google',{failureRedirect:'/sign-in',successRedirect:'/home'})
);

// facebook routes 
router.get('/auth/facebook',passport.authenticate('facebook'));

router.get('/auth/facebook/callback',passport.authenticate('facebook', { failureRedirect: '/sign-in' ,successRedirect:'/home'}));


module.exports = router ;