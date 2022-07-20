const  mongoose =require( 'mongoose');

const billType=new mongoose.Schema({
type:{
    type:String,
},
state:{
    type:String,
}

});
const BillType=mongoose.model("BillType",billType);
module.exports=BillType;