const  mongoose =require( 'mongoose');

const policy=new mongoose.Schema({
totaldays:{
    type:Number,
},
type:{
    type:String,
},
state:{
    type:String,
},
Color:{
    type:String,
},
});
const companyPloicy=mongoose.model("HrSystem",policy);
module.exports=companyPloicy;