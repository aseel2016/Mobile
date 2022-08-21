const  mongoose =require( 'mongoose');

const jobs=new mongoose.Schema({
title:{
    type:String,
},
manager:{
    type:String,
},
Description:{
    type:String,
},
state:{
    type:String,
},
openDate:{
type:Date,
},
Keywords:{
    type:[String],
},
Applicants:{
type:[
    { 'email':String,
     'status':String,
     'date':Date,

    }
],
},
});
const Jobs=mongoose.model("Job",jobs);
module.exports=Jobs;