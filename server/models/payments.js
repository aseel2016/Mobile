const  mongoose =require( 'mongoose');

const payment=new mongoose.Schema({
totalSalaries:{
    type:Number,
},
Date:{
    type:Date,
},
numberHired:{
    type:Number,
},


});
const Payment=mongoose.model("payments",payment);
module.exports=Payment;