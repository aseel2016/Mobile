const  mongoose =require( 'mongoose');

const clock=new mongoose.Schema({
email:{
    type:String,
},
Clockin:{
    type:Date,
},
Clockout:{
    type:Date,
},

});
const Clock=mongoose.model("Clock",clock);
module.exports=Clock;