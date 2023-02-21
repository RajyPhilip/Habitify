const User = require('../models/user');
const Habit = require('../models/habit');

module.exports.signInPage = (req,res)=>{
    if(req.isAuthenticated()){
        return  res.render('home')
  } 
    return res.render('signInPage')
}

module.exports.signUpPage = (req,res)=>{
    if(req.isAuthenticated()){
        return  res.render('home')
  } 
    return res.render('signUpPage')
}

//login
module.exports.logIn = async (req,res)=>{
    return res.redirect('/home')
}
//logout
module.exports.logOut = async (req,res)=>{
    req.logout(function(err){
        if(err){
            return console.log("error",err)
        }
        return res.redirect('/')
    })
}
//signup
module.exports.signUp = async (req,res)=>{
    try {

        if(req.body.password != req.body.confirmPassword){
        req.flash('error',"Passwords do not match");
            return res.redirect('back')
        }
        let user=  await  User.findOne({email:req.body.email}) ;
        if(!user){
            let {name,email,password} = req.body ;
            User.create({
                name: name,
                email: email,
                password: password,                
            })
           
            return res.render('signInPage')
        }
        return res.redirect('back')
    } catch (err) {
        console.log("error ",err);
    }
}

//FUNCTIONS

// addHabit

module.exports.addHabit = async (req,res)=>{
    try {

        let habit=  await  Habit.findOne({name:req.body.name}) ;
        let today = new Date().toDateString();
        
        if(!habit){
            let {name} = req.body ;
            Habit.create({
                name: name,
                user: req.user.id ,
                record_tracker:[{
                    date: today,
                    status:"none"
                }] ,                
            })
            
            return res.redirect('/home')
        }
        return res.redirect('back')
    } catch (err) {
        console.log("error ",err);
    }
}

//delete habit

module.exports.deleteHabit = async (req,res)=>{
    try {
        
        let habit=  await  Habit.findOneAndDelete({_id:req.params.id}) ;
        
        return res.redirect('/home')
    } catch (err) {
        console.log("error ",err);
    }
}

// update status 

module.exports.updateStatus =  async(req,res)=>{
    //params se collect krna hai find nd update krna hai nd save ekrna nd redirect back krna hai 
    
    try {
        
        const {habitId,recordId} = req.params ;
        const status = req.body.status ;

        
        const habit =  await Habit.findOneAndUpdate(
            { _id: habitId, "record_tracker._id": recordId },
            { $set: { "record_tracker.$.status": status } },
            { new: true }
        );
        return res.redirect('back');
    } catch (error) {
        console.log("ERROR",error);
    }
}