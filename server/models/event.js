const { boolean } = require('joi');
const  mongoose =require( 'mongoose');

const event=new mongoose.Schema({
Id:String,
Subject:String,
Location:String,
StartTime:Date,
EndTime:Date,
resouceID:Number,
StartTimezone:String,
EndTimezone:String,
Description:String,
IsAllDay:Boolean,
RecurrenceRule:String,
Emails:[String],
});
const events=mongoose.model("event",event);
module.exports=events;
