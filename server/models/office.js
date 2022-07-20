const  mongoose =require( 'mongoose');

const office=new mongoose.Schema({
branch:{
    type:String,
},
location:{
    type:String,
},
HeadofBranch:{
    type:String,
},
});
const Office=mongoose.model("Office",office);
module.exports=Office;