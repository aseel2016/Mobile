const  mongoose =require( 'mongoose');

const location=new mongoose.Schema({
email:{
    type:String,
},
Date:{
    type:Date,
},
Latitude:{
    type:String,
},
longitude:{
    type:String,
},
});
const Location=mongoose.model("Location",location);
module.exports=Location;