const  mongoose =require( 'mongoose');

const empolyee=new mongoose.Schema({
firstName:String,
lastName:String,
email:{
    type: String,
    unique: true,
},
password:String,
lastEvaluation:Date,
age:Number,
BankAccount:String,
gender:String,
Salary:Number,
jobTitle:String,
Team:String,
office:String,
Address:String,
phoneNumber:Number,
hiringDate:Date,
accessible:String,
TerminationDate:Date,
ExtraWFH:Number,
ExtrsVacation:Number,
giveEquipment:String,
oldSalary:[Number],
image:String,




});
const Empolyee=mongoose.model("Employee",empolyee);
module.exports=Empolyee;