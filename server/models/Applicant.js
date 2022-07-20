const  mongoose =require( 'mongoose');

const applicant=new mongoose.Schema({
    
email:{
        type: String,
        unique: true,
    },
password:{
    type:String,
}

});
const Applicant=mongoose.model("Applicants",applicant);
module.exports=Applicant;