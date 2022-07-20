const  mongoose =require( 'mongoose');

const bill=new mongoose.Schema({
Type:{
    type:String,
},
amount:{
    type:Number,
},
officeId:{
    type:String,
},
date:{
    type:Date,
},
inOut:{
    type:String,
}

});
const Bills=mongoose.model("Bills",bill);
module.exports=Bills;