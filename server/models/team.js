const  mongoose =require( 'mongoose');

const team=new mongoose.Schema({
name:String,
teamLeader:String,
Manager:String,
});
const teamA=mongoose.model("teams",team);
module.exports=teamA;