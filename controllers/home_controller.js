const User = require('../models/user');
const Habit = require('../models/habit');

module.exports.landingPage = async(req,res)=>{
    if(req.isAuthenticated()){
        return  res.redirect('/home') ;
  } 
    return res.render('landingPage')
}

module.exports.home = async(req,res)=>{
    if(req.isAuthenticated()){
        //habits of user find krke bhejna hai 
        let allHabits = await Habit.find({user:req.user.id})
        let today = new Date().toDateString();
        // habitschema k record_tracker.date se match karta hai today  toh phir mko kuch ni krna hai nd agr ni rhega toh record tracker mh naya object push krna hai jisme date rhega today nd status rhega none
        allHabits.forEach(habit=>{
            let found = false ;
            habit.record_tracker.forEach( track=>{
                if(track.date === today){
                    found = true ;
                }
            })
            if(!found){
                habit.record_tracker.push({date:today,status: "none"});
                habit.save();
            }
        });
        allHabits = await  Habit.find({user:req.user.id}) ;
        return  res.render('home',{allHabits:allHabits}) ;
    } 
    return res.render('landingPage') ;
}

module.exports.details = async(req,res)=>{
    if(req.isAuthenticated()){
        const {habitId} = req.params ;
        // habit ko id se find krenge nd bhej denge render k tym
        const habit = await Habit.findById({_id:habitId});
        return  res.render('_details',{
            habit:habit
        })
    }
    return  res.render('landingPage')
}