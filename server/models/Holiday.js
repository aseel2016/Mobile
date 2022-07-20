const  mongoose =require( 'mongoose');

const holiday=new mongoose.Schema({
name:{
    type:String,
},
start:{
    type:Date,
},
end:{
    type:Date,
},

});
const Holidays=mongoose.model("holidays",holiday);
module.exports=Holidays;