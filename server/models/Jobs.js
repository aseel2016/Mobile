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
Keywords:{
    type:[String],
},
Applicants:{
type:[
    { 'email':String,
     'status':String,

    }
],
},
});
const Jobs=mongoose.model("Job",jobs);
module.exports=Jobs;