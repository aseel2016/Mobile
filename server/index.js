
const mongoose = require('mongoose');
const companyPloicy=require('./models/HrSystem')
const Employee=require('./models/Employee')
const RequestOff=require('./models/TimeRequests')
const event=require('./models/event')
const Salary=require('./models/payments')
const Job=require('./models/Jobs')
const Applicants=require('./models/Applicant')

const Conversation=require('./models/Conversation')
const Message=require('./models/Message')
const holiday=require('./models/Holiday')
const team=require('./models/team')
const location=require('./models/Location')
const Clock = require('./models/Clockin');
const Office = require('./models/office');
const Bill = require('./models/Bills');
const BillTypes = require('./models/billTypes');
const {useState, useEffect}=require('react');
const jwt =require('jsonwebtoken');
const { useSearchParams } =require( "react-router-dom");
const React=require( 'react');
const cors=require('cors');
const cookieParser=require('cookie-parser');
const express = require ('express');
const app=express();
const cookie =require( 'cookie');


const Joi = require("joi");
const Holidays = require('./models/Holiday');

mongoose.connect('mongodb+srv://AA:aseelfrance2016@cluster0.ahlrcmp.mongodb.net/HrSystem?retryWrites=true&w=majority',{
useNewUrlParser:true,
useUnifiedTopology:true,

});

app.use(express.json());
app.use(cors());
app.use(cookieParser());
{/*
app.get("/read",async(req,res)=>{
    companyPloicy.find({},{totaldays:1,type:1,_id:0},(err,result)=>{
        if(err){
            res.send(err);
        }
        res.send(result);
    })
  
});
app.get("/",async(req,res)=>{
   const employee=new Employee({firstName:'aida',lastName:'bustami',email:'aida_bustami@yahoo.com',
   password:'aida',age:22,BankAccount:'9874561',gender:'female',Salary:1500,jobTitle:'software engineer'
   ,Team:'NUTANIX',office:'Nablus',Address:'Ektaba/Tulkarm',phoneNumber:'0598454631', hiringDate: "2022-01-16T00:00:00.000Z"  ,
   accessible:'No',
}); 
  try{
    await employee.save();
    res.send('inserted data')
  }
  catch(err){
    console.log(err);
  }

});
app.get("/",async(req,res)=>{
   const reu=new RequestOff({ emplyeeId:'62ab4da8814c01b55ae1cd99',
   Type:'Vacation',Description:'Travilling to France', Starting:"2022-01-16T00:00:00.000Z" ,
   Ending:"2022-01-16T00:00:00.000Z" ,
}); 
  try{
    await reu.save();
    res.send('inserted data');
  }
  catch(err){
    console.log(err);
  }

});

app.get("/",async(req,res)=>{
  const employee=new Employee({firstName:'aida',lastName:'bustami',email:'aida_bustami@yahoo.com',
  password:'aida',age:22,BankAccount:'9874561',gender:'female',Salary:1500,jobTitle:'software engineer'
  ,Team:'NUTANIX',office:'Nablus',Address:'Ektaba/Tulkarm',phoneNumber:'0598454641', hiringDate: "2022-01-16T00:00:00.000Z"  ,
  accessible:'No',TakenSick:2,TakenVacation:0,TakenParental:0,TakenWorkfromHome:3,
}); 
 try{
   await employee.save();
   res.send('inserted data')
 }
 catch(err){
   console.log(err);
 }

});
app.get("/read",async(req,res)=>{
  Employee.find({},{TakenSick:1,TakenVacation:1,TakenParental:1,TakenWorkfromHome:1  },(err,result)=>{
      if(err){
          res.send(err);
      }
      res.send(result);
  })

});
*/}

app.get("/read",async(req,res)=>{
  RequestOff.find({},(err,result)=>{
      if(err){
          res.send(err);
      }
      res.send(result);
  })

});

app.get("/policy",async(req,res)=>{
  companyPloicy.find({},(err,result)=>{
      if(err){
          res.send(err);
      }
      res.send(result);
  })

});
app.get("/getAllActive",async(req,res)=>{
  Employee.find({TerminationDate:null},{},(err,result)=>{
      if(err){
          res.send(err);
      }
      res.send(result);
  })

});


app.get("/getHolidays",async(req,res)=>{
  Holidays.find({},(err,result)=>{
      if(err){
          res.send(err);
      }
      res.send(result);
  })

});

app.post('/editExVa', async (req, res) => {
  console.log(req.body);
  const d =req.body.days;
  const id=req.body.id;
  Employee.findOneAndUpdate(
    {"_id":id}, 

    { 
        $set: {'ExtrsVacation':d}
    },
    {
        returnNewDocument: true
    }
  , function( error, result){
   if(error)
  {
    res.json({user:false});
  }
   else{
    res.json({user:true});
   }
  });
 

	
}

)
app.post('/editExW', async (req, res) => {
  console.log(req.body);
  const d =req.body.days;
  const id=req.body.id;
  Employee.findOneAndUpdate(
    {"_id":id}, 

    { 
        $set: {'ExtraWFH':d}
    },
    {
        returnNewDocument: true
    }
  , function( error, result){
   if(error)
  {
    res.json({user:false});
  }
   else{
    res.json({user:true});
   }
  });
 

	
}

)
app.post('/editSalary', async (req, res) => {
  console.log(req.body);
  const s =req.body.salary;
  const id=req.body.id;
  Employee.findOneAndUpdate(
    {"_id":id}, 

    { 
        $set: {'Salary':s}
    },
    {
        returnNewDocument: true
    }
  , function( error, result){
   if(error)
  {
    res.json({user:false});
  }
   else{
    res.json({user:true});
   }
  });
 

	
}

)
app.post('/editEquipment', async (req, res) => {
  console.log(req.body);
  const s =req.body.equipment;
  const id=req.body.id;
  Employee.findOneAndUpdate(
    {"_id":id}, 

    { 
        $set: {'giveEquipment':s}
    },
    {
        returnNewDocument: true
    }
  , function( error, result){
   if(error)
  {
    res.json({user:false});
  }
   else{
    res.json({user:true});
   }
  });
 

	
}

)
app.post('/editPloicy', async (req, res) => {
  console.log(req.body);
  const type =req.body.type;
  const days =req.body.total;
  companyPloicy.findOneAndUpdate(
    {"type":type}, 

    { 
        $set: {'totaldays':days}
    },
    {
        returnNewDocument: true
    }
  , function( error, result){
   if(error)
  {
    res.json({user:false});
  }
   else{
    res.json({user:true});
   }
  });
 

	
}


)

app.get("/taken",async(req,res)=>{
  Employee.find({},(err,result)=>{
      if(err){
          res.send(err);
      }
      res.send(result);
  })

});
{/*{password:Mypassword,email:Myemail} 
const token=req.headers['x-access-token'];
  if(!token){
    res.send("you must send token");
  }
  else{

    jwt.verify(token,"aseelfrance2016"),(error,decoded)=>{
      if(error){
        res.json({auth:false,message:"you are not authenticated"});
      }
      else{
        req.email=decoded.email;
        next();
      }
    }
  }
  const verifyJWT=(req, res,next)=>{
  
}
*/}



 
app.post('/login', async (req, res) => {
	console.log(req.body);
  
  
  const user = await Employee.findOne({
		email: req.body.email,
    password:req.body.password,
    accessible:"Yes",
	})
  
  if(user){
    const token=jwt.sign({
      email:user.email,


    },'aseelfrance2016',{
      expiresIn:60*60,
     
    });
  
    res.status(200).json({ user: true ,token:token});
    
   
  }

	if (!user) {
   
    res.status(400).json({ user:false  });
	}

	

	
})
app.post('/check', async (req, res) => {
	console.log(req.body.tokenn);
  try{
  const decoded = jwt.verify(req.body.tokenn, 'aseelfrance2016')
  console.log(decoded.email+"decodec");
  const email = decoded.email;
	const user = await Employee.findOne(
    { email: email,accessible:"Yes", }
    )
    if(user){
      res.status(200).json({ user: true ,email:email});
    }
if(!user){
  res.status(400).json({ user:false  });
}
} 
catch(err){
  res.status(400).json({ user:false  });
}
	
}

)

app.post('/check2', async (req, res) => {
	console.log(req.body.tokenn);
  try{
  const decoded = jwt.verify(req.body.tokenn, 'aseelfrance2016')
  console.log(decoded.email+"decodec");
  const email = decoded.email;
	const user = await Applicants.findOne(
    { email: email }
    )
    if(user){
      res.status(200).json({ user: true ,email:email});
    }
if(!user){
  res.status(400).json({ user:false  });
}
} 
catch(err){
  res.status(400).json({ user:false  });
}
	
}

)


app.post('/accept-reject', async (req, res) => {
  console.log(req.body);
  const id =req.body.id;
  const sta=req.body.status;
  RequestOff.findOneAndUpdate(
    {"emplyeeId":id}, 
    { 
        $set: {'StatusHR':sta}
    },
    {
        returnNewDocument: true
    }
  , function( error, result){
   if(error)
  {
    res.json({user:false});
  }
   else{
    res.json({user:true});
   }
  });
 

	
}


)

app.post('/find_email', async (req, res) => {
  console.log(req.body);
  const id =req.body.id;
  const user = await Employee.findOne(
    { _id:id }
    )
    if(user){
      res.status(200).json({ user: true ,email:user.email});
    }
if(!user){
  res.status(400).json({ user:false  });
 
  
 

	
}
}
);

app.post('/find_hr', async (req, res) => {
  console.log(req.body);
  const email =req.body.email;
  const user = await Employee.findOne(
    { email:email }
    )
    if(user){
      res.status(200).json({ user: true ,
        id:user._id,
        first:user.firstName,
        last:user.lastName,
        
        });
    }
if(!user){
  res.status(400).json({ user:false  });
 
  
 

	
}
}
);

app.get("/getAllteams",async(req,res)=>{
  team.find({},(err,result)=>{
      if(err){
          res.send(err);
      }
      res.send(result);
  })

});

app.get("/getBill",async(req,res)=>{
  Bill.find({},(err,result)=>{
      if(err){
          res.send(err);
      }
      res.send(result);
  })

});
app.get("/getAll",async(req,res)=>{
  Employee.find({accessible :'No',
  TerminationDate:null},{},(err,result)=>{
      if(err){
          res.send(err);
      }
      res.send(result);
  })

});
app.get("/getAlljobs",async(req,res)=>{
  Job.find({},(err,result)=>{
      if(err){
          res.send(err);
      }
      res.send(result);
  })

});
app.get("/getAllEmployees",async(req,res)=>{
  Employee.find({},(err,result)=>{
      if(err){
          res.send(err);
      }
      res.send(result);
  })

});
app.get("/getClock",async(req,res)=>{
  Clock.find({},(err,result)=>{
      if(err){
          res.send(err);
      }
      res.send(result);
  })

});
app.get("/getOffice",async(req,res)=>{
  Office.find({},(err,result)=>{
      if(err){
          res.send(err);
      }
      res.send(result);
  })

});
app.get("/getLocation",async(req,res)=>{
  location.find({},(err,result)=>{
      if(err){
          res.send(err);
      }
      res.send(result);
  })

});

app.get("/getAccepted",async(req,res)=>{
  RequestOff.find({StatusHR :'accepted'},{},(err,result)=>{
      if(err){
          res.send(err);
      }
      res.send(result);
  })

});

app.post("/getRequestID",async(req,res)=>{

  console.log(req.body);
  const id =req.body.id;
  const user = await RequestOff.findOne(
    { _id:id }
    )
    if(user){
      res.status(200).json({ user: true ,
        Description:user.Description,
        type:user.Type,
        start:user.Starting,
        end:user.Ending,
        idd:user.emplyeeId,
        
        });
    }
if(!user){
  res.status(400).json({ user:false  });}
});

app.post("/insert_policy",async(req,res)=>{

  console.log(req.body);
  const t =req.body.type;
  const d =req.body.total;
  const s =req.body.state;
  const doc = new companyPloicy({ totaldays:d,type:t,state:s })
 
  doc.save((err, doc) => {
    if (err) {
      res.status(400).json({ user:false  });
    } else {
      res.status(200).json({ user: true ,});
    }
  });
});
app.post("/insert_Holiday",async(req,res)=>{

  console.log(req.body);
  const n =req.body.name;
  const s =req.body.start;
  const e =req.body.end;
  const doc = new Holidays({ name:n,start:s,end:e })
 
  doc.save((err, doc) => {
    if (err) {
      res.status(400).json({ user:false  });
    } else {
      res.status(200).json({ user: true ,});
    }
  });
});
app.post("/updateRecord",async(req,res)=>{
  
  console.log(req.body);
  const t =req.body.salary;
  const d =req.body.date;
  const n=req.body.number;
 
  const doc = new Salary({ totalSalaries:t,Date:d ,numberHired:n})

 
  doc.save((err, doc) => {
    if (err) {
      res.status(400).json({ user:false  });
    } else {
      res.status(200).json({ user: true ,});
    }
  });



});
app.get("/getAllpayments",async(req,res)=>{
  Salary.find({},(err,result)=>{
      if(err){
          res.send(err);
      }
      res.send(result);
  })

});
app.post("/deletePloicy",async(req,res)=>{

  console.log(req.body);
  const type =req.body.type;
 
  companyPloicy.findOneAndDelete(
    {"type":type}, 
    {
        returnNewDocument: true
    }
  , function( error, result){
   if(error)
  {
    res.json({user:false});
  }
   else{
    res.json({user:true});
   }
  });
 

});




app.post("/getColor",async(req,res)=>{

  console.log(req.body);
  const typre =req.body.type;
  console.log(typre+"gg")
  companyPloicy.find({type:typre},{totaldays:0,state:0,type:1,_id:0,Color:1},(err,result)=>{
    if(err){
        res.send(err);
    }
    res.send(result);
  })

});

app.post("/insert_event",async(req,res)=>{

  console.log(req.body);
  const email=req.body.email;
  const id=req.body.Id;
  const s =req.body.Subject;
  const st =req.body.StartTime;
  const et =req.body.EndTime;
  const is =req.body.IsAllDay;
  const stz =req.body.StartTimezone;
  const etz =req.body.EndTimezone;
  const l =req.body.Location;
  const rr =req.body.RecurrenceRule;
  const r =req.body.resouceID;
  const d =req.body.Description;

  const doc = new event({Id:id, Subject:s,StartTime:st,EndTime:et,
    IsAllDay:is,StartTimezone:stz,EndTimezone:etz,
    Location:l,RecurrenceRule:rr,resouceID:r,Description:d
  })
  
  doc.save((err, doc) => {
    if (err) {
      res.status(400).json({ user:false  });
    } else {
      res.status(200).json({ user: true ,});
    }
  });
});
app.post("/update_email",async(req,res)=>{

  console.log(req.body);
  const email=req.body.email;
  const id=req.body.Id;
  event.findOneAndUpdate(
    {"Id":id}, 

    { 
        $addToSet: {Emails:email,}
    },
    {
        returnNewDocument: true
    }
  , function( error, result){
   if(error)
  {
    res.json({user:false});
  }
   else{
    res.json({user:true});
   }
  });
 


});


app.get("/getAllEvents",async(req,res)=>{
  event.find({},(err,result)=>{
      if(err){
          res.send(err);
      }
      res.send(result);
  })

});

app.post("/update_oldSalary",async(req,res)=>{

  console.log(req.body);
  const id=req.body.id;
  const old=req.body.oldsalary;
  Employee.findOneAndUpdate(
    {"_id":id}, 

    { 
        $push: {oldSalary:old,}
    },
    {
        returnNewDocument: true
    }
  , function( error, result){
   if(error)
  {
    res.json({user:false});
  }
   else{
    res.json({user:true});
   }
  });
 


});

app.post('/update_event', async (req, res) => {
  console.log(req.body);
  const id=req.body.Id;
  const s =req.body.Subject;
  const st =req.body.StartTime;
  const et =req.body.EndTime;
  const is =req.body.IsAllDay;
  const stz =req.body.StartTimezone;
  const etz =req.body.EndTimezone;
  const l =req.body.Location;
  const rr =req.body.RecurrenceRule;
  const r =req.body.resouceID;
  const d =req.body.Description;
  event.findOneAndUpdate(
    {"Id":id}, 

    { 
        $set: {Subject:s,StartTime:st,EndTime:et,
        IsAllDay:is,StartTimezone:stz,EndTimezone:etz,
        Location:l,RecurrenceRule:rr,resouceID:r,Description:d,}
    },
    {
        returnNewDocument: true
    }
  , function( error, result){
   if(error)
  {
    res.json({user:false});
  }
   else{
    res.json({user:true});
   }
  });
 

	
}


)

app.post("/delete_event",async(req,res)=>{

  console.log(req.body);
  const id =req.body.Id;
 
  event.findOneAndDelete(
    {"Id":id}, 
    {
        returnNewDocument: true
    }
  , function( error, result){
   if(error)
  {
    res.json({user:false});
  }
   else{
    res.json({user:true});
   }
  });
 

});


app.post("/deleteEmployee",async(req,res)=>{

  console.log(req.body);
  const e =req.body.email;
  const d =req.body.date;
  Employee.findOneAndUpdate(
    {"email":e}, 

    { 
        $set: {TerminationDate:d}
    },
    {
        returnNewDocument: true
    }
  , function( error, result){
   if(error)
  {
    res.status(400).send("error deleting");
  }
   else{
    res.status(200).send("Successfully done");   }
  });
});
app.post("/Updateclocks",async(req,res)=>{
  console.log(req.body);
  const id=req.body.id;
  const e=req.body.email;
  const t=req.body.Clockin;
  const a=req.body.Clockout;
  
  Clock.findOneAndUpdate(
    {"_id":id}, 

    { 
        $set: {email:e,Clockin:t,Clockout:a}
    },
    {
        returnNewDocument: true
    }
  , function( error, result){
   if(error)
  {
    res.status(400).send("error Updating");
  }
   else{
    res.status(200).send("Successfully done");   }
  });
  
});
app.post("/deleteHoliday",async(req,res)=>{

  console.log(req.body);
  const it =req.body.id;
  
  Holidays.findOneAndDelete(
    {"_id":it}, 
    {
        returnNewDocument: true
    }
  , function( error, result){
   if(error)
  {
    res.status(400).send("error deleting");
  }
   else{
    res.status(200).send("Successfully done");   }
  });
});
app.post("/updatePassword",async(req,res)=>{
  
  console.log(req.body);
  const e =req.body.email;
  const p =req.body.password;
 

  Employee.findOneAndUpdate(
    {"email":e}, 

    {   
        $set: {password:p}
    },
    {
        returnNewDocument: true
    }
  , function( error, result){
   if(error)
  {
    res.status(400).send("error Updating");
  }
   else{
    res.status(200).send("Successfully done");   }
  });


});
app.post("/deleteclocks",async(req,res)=>{

  console.log(req.body);
  const it =req.body.iddd;
  
  Clock.findOneAndDelete(
    {"_id":it}, 
    {
        returnNewDocument: true
    }
  , function( error, result){
   if(error)
  {
    res.status(400).send("error deleting");
  }
   else{
    res.status(200).send("Successfully done");   }
  });
});
app.post("/deleteteam",async(req,res)=>{

  console.log(req.body);
  const it =req.body.id;
  
  team.findOneAndDelete(
    {"_id":it}, 
    {
        returnNewDocument: true
    }
  , function( error, result){
   if(error)
  {
    res.status(400).send("error deleting");
  }
   else{
    res.status(200).send("Successfully done");   }
  });
});
app.post("/deleteBill",async(req,res)=>{

  console.log(req.body);
  const it =req.body.id;
  
  Bill.findOneAndDelete(
    {"_id":it}, 
    {
        returnNewDocument: true
    }
  , function( error, result){
   if(error)
  {
    res.status(400).send("error deleting");
  }
   else{
    res.status(200).send("Successfully done");   }
  });
});
app.post("/Updateteam",async(req,res)=>{
  console.log(req.body);
  const i=req.body.id;

  const n=req.body.name;
  const m=req.body.manager;
  const t=req.body.teamleader;
 
  team.findOneAndUpdate(
    {"_id":i}, 

    {   
        $set: {Manager:req.body.manager,teamLeader:req.body.teamleader}
    },
    {
        returnNewDocument: true
    }
  , function( error, result){
   if(error)
  {
    res.status(400).send("error Updating");
  }
   else{
    res.status(200).send("Successfully done");   }
  });
  
});
app.post("/UpdateEmployee",async(req,res)=>{
  console.log(req.body);
  const id=req.body.id;
  const e=req.body.email;
  const t=req.body.team;
  const j=req.body.jobTitle;
  const o=req.body.office;
  const a=req.body.address;
  const p=req.body.phone;
 
  Employee.findOneAndUpdate(
    {"_id":id}, 

    { 
        $set: {email:e,Team:t,jobTilte:j,office:o,Address:a,phoneNumber:p}
    },
    {
        returnNewDocument: true
    }
  , function( error, result){
   if(error)
  {
    res.status(400).send("error Updating");
  }
   else{
    res.status(200).send("Successfully done");   }
  });
  
});
app.post("/deleteoffice",async(req,res)=>{

  console.log(req.body);
  const it =req.body.id;
  
  Office.findOneAndDelete(
    {"_id":it}, 
    {
        returnNewDocument: true
    }
  , function( error, result){
   if(error)
  {
    res.status(400).send("error deleting");
  }
   else{
    res.status(200).send("Successfully done");   }
  });
});
app.post("/insert_office",async(req,res)=>{

  console.log(req.body);
  const l =req.body.location;
  const b =req.body.branch;
  const h =req.body.HeadofBranch;
  const doc = new Office({ branch:b,location:l,HeadofBranch:h })
 
  doc.save((err, doc) => {
    if (err) {
      res.status(400).json({ user:false  });
    } else {
      res.status(200).json({ user: true ,});
    }
  });
});
app.post("/insert_bill",async(req,res)=>{
 
  console.log(req.body);
  const o =req.body.officeid;
  const t =req.body.type;
  const i =req.body.inout;
  const d =req.body.date;
  const a =req.body.amount;
const doc = new Bill({ date:d,inOut:i,officeId:o,amount:a,Type:t})
 
  doc.save((err, doc) => {
    if (err) {
      res.status(400).json({ user:false  });
    } else {
      res.status(200).json({ user: true ,});
    }
  });
});

app.post("/insert_employee",async(req,res)=>{
  console.log(req.body);
 
  const doc = new Employee({ email:req.body.email,password:req.body.pass,age:req.body.age,
  firstName:req.body.first,lastName:req.body.last,office:req.body.office,
  gender:req.body.gender,Salary:req.body.salary,BankAccount:req.body.bank,
  hiringDate:req.body.hiring,Address:req.body.address,phoneNumber:req.body.phone,
  jobTitle:req.body.job,Team:req.body.team,
  ExtraWFH:req.body.extrw,
  ExtrsVacation  :req.body.extrav,
  accessible:"No",giveEquipment:req.body.startkit,
  
  
  })
 
  doc.save((err, doc) => {
    if (err) {
      res.status(400).json({ user:false  });
    } else {
      res.status(200).json({ user: true ,});
    }
  });
});

app.post("/insert_admin",async(req,res)=>{
  console.log(req.body);
 
  const doc = new Employee({ email:req.body.email,password:req.body.pass,age:req.body.age,
  firstName:req.body.first,lastName:req.body.last,office:req.body.office,
  gender:req.body.gender,Salary:req.body.salary,BankAccount:req.body.bank,
  hiringDate:req.body.hiring,Address:req.body.address,phoneNumber:req.body.phone,
  jobTitle:req.body.job,
  accessible:"Yes",
  
  
  })
 
  doc.save((err, doc) => {
    if (err) {
      res.status(400).json({ user:false  });
    } else {
      res.status(200).json({ user: true ,});
    }
  });
});
app.post("/insert_team",async(req,res)=>{
  console.log(req.body);
 
  const doc = new team({ name:req.body.name,
    Manager:req.body.manager,teamLeader:req.body.teamleader
  
  
  })
 
  doc.save((err, doc) => {
    if (err) {
      res.status(400).send("erro")
    } else {
      res.status(200).send("done");
    }
  });
});



app.post("/Updateoffice",async(req,res)=>{
  console.log(req.body);
  const id=req.body.id;
  const e=req.body.branch;
  const t=req.body.location;
  const a=req.body.Headofbranch;
  
  Office.findOneAndUpdate(
    {"_id":id}, 

    { 
        $set: {branch:e,location:t,HeadofBranch:a}
    },
    {
        returnNewDocument: true
    }
  , function( error, result){
   if(error)
  {
    res.status(400).send("error Updating");
  }
   else{
    res.status(200).send("Successfully done");   }
  });
  
});


app.get("/getBillTypes",async(req,res)=>{
  BillTypes.find({},(err,result)=>{
      if(err){
          res.send(err);
      }
      res.send(result);
  })

});

app.post("/insert_typeBill",async(req,res)=>{

  console.log(req.body);
  const t =req.body.type;
  const s =req.body.state;
  const doc = new BillTypes({ type:t,state:s})
 
  doc.save((err, doc) => {
    if (err) {
      res.status(400).json({ user:false  });
    } else {
      res.status(200).json({ user: true ,});
    }
  });
});
app.post("/deleteType",async(req,res)=>{

  console.log(req.body);
  const it =req.body.id;
  
  BillTypes.findOneAndDelete(
    {"_id":it}, 
    {
        returnNewDocument: true
    }
  , function( error, result){
   if(error)
  {
    res.status(400).send("error deleting");
  }
   else{
    res.status(200).send("Successfully done");   }
  });
});

app.get("/getAdmins",async(req,res)=>{
  Employee.find({accessible :'Yes',
  TerminationDate:null},{},(err,result)=>{
      if(err){
          res.send(err);
      }
      res.send(result);
  })

});

app.post("/UpdateAdmin",async(req,res)=>{
  console.log(req.body);
  const id=req.body.id;
  const e=req.body.email;
   const o=req.body.office;
  const p=req.body.phone;
 
  Employee.findOneAndUpdate(
    {"_id":id}, 

    { 
        $set: {email:e,office:o,phoneNumber:p}
    },
    {
        returnNewDocument: true
    }
  , function( error, result){
   if(error)
  {
    res.status(400).send("error Updating");
  }
   else{
    res.status(200).send("Successfully done");   }
  });
  
});

app.post("/deleteAdmin",async(req,res)=>{

  console.log(req.body);
  const e =req.body.id;
  const d =req.body.date;
  Employee.findOneAndUpdate(
    {"_id":e}, 

    { 
        $set: {TerminationDate:d}
    },
    {
        returnNewDocument: true
    }
  , function( error, result){
   if(error)
  {
    res.status(400).send("error deleting");
  }
   else{
    res.status(200).send("Successfully done");   }
  });
});


//new conv http://localhost:3001/

app.post("/newCon", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get conv of a user

app.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conv includes two userId

app.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation)
  } catch (err) {
    res.status(500).json(err);
  }
});



//add

app.post("/addMessage", async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get

app.get("/getCon/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});


app.post("/addJob", async (req, res) => {
  const job = new Job(req.body);

  try {
    const newJob = await job.save();
    res.status(200).json(newJob);
  } catch (err) {
    res.status(500).json(err);
  }
});


app.post('/signupApp', async (req, res) => {
	
const applicant = new Applicants(req.body);

  try {
    const newApp = await applicant.save();
    res.status(200).json(newApp);
  } catch (err) {
    res.status(500).json(err);
  }
})


app.post('/signin', async (req, res) => {
	console.log(req.body);
  
  
  const user = await Applicants.findOne({
		email: req.body.email,
    password:req.body.password,
	})
  
  if(user){
    const token=jwt.sign({
      email:user.email,


    },'aseelfrance2016',{
      expiresIn:60*60,
     
    });
  
    res.status(200).json({ user: true ,token:token});
    
   
  }

	if (!user) {
   
    res.status(400).json({ user:false  });
	}

	

	
})

{/** id:jobid,
          applicantNew:data,  */}

          app.post("/insertApplicant",async(req,res)=>{

            console.log(req.body);
            const id=req.body.id;
            const aplicant=req.body.applicantNew;
            Job.findOneAndUpdate(
              {"_id":id}, 
          
              { 
                  $push: {Applicants:aplicant,}
              },
              {
                  returnNewDocument: true
              }
            , function( error, result){
             if(error)
            {
              res.json({user:false});
            }
             else{
              res.json({user:true});
             }
            });
           
          
          
          });     
          
          ////////////Mobile begin
          
          app.post('/loginEmployee', async (req, res) => {
            console.log(req.body);
            
            
            const user = await Employee.findOne({
              email: req.body.email,
              password:req.body.password,
              accessible:"No",
            })
            
            if(user){
              const token=jwt.sign({
                email:user.email,
          
          
              },'aseelfrance2016',{
                expiresIn:60*60,
               
              });
            
              res.status(200).json({ user: true ,token:token});
              
             
            }
          
            if (!user) {
             
              res.status(400).json({ user:false  });
            }
          
            
          
            
          })

          app.post('/check3', async (req, res) => {
            console.log(req.body.value);
            try{
            const decoded = jwt.verify(req.body.value, 'aseelfrance2016')
            console.log(decoded.email+"decodec");
            const email = decoded.email;
            const user = await Employee.findOne(
              { email: email,accessible:"No", }
              )
              if(user){
                res.status(200).json({ user: true ,email:email});
              }
          if(!user){
            res.status(400).json({ user:false  });
          }
          } 
          catch(err){
            res.status(400).json({ user:false  });
          }
            
          }
          
          )
          app.post("/insert_clock",async(req,res)=>{
           
            console.log(req.body);
            const t =req.body.email;
            const d =req.body.Clockin;
         
            const doc = new Clock({ Clockin:d,email:t })
           
            doc.save((err, doc) => {
              if (err) {
                res.status(400).json({ user:false  });
              } else {
                res.status(200).json({ user: true ,});
              }
            });
          });
          
          app.post("/update_clock",async(req,res)=>{
            console.log(req.body);
           
            const e=req.body.email;
            const t=req.body.Clockout;
           
            Clock.findOneAndUpdate(
              {"email":e, "Clockout":null}, 
          
              { 
                  $set: {Clockout:t}
              },
              {
                  returnNewDocument: true
              }
            , function( error, result){
             if(error)
            {
              res.status(400).send("error Updating");
            }
             else{
              res.status(200).send("Successfully done");   }
            });
            
          });

          app.post("/uploadImage",async(req,res)=>{
            console.log(req.body);
           
            const e=req.body.email;
            const f=req.body.first;
            const l=req.body.last;
            const a=req.body.add;
            const p=req.body.phone;
            const i=req.body.image;
            Employee.findOneAndUpdate(
              {"email":e}, 
          
              { 
                  $set: {firstName:f,lastName:l,Address:a,phoneNumber:p,image:i}
              },
              {
                  returnNewDocument: true
              }
            , function( error, result){
             if(error)
            {
              res.status(400).send("error Updating");
            }
             else{
              res.status(200).send("Successfully done");   }
            });
            
          });

          
          app.post("/addLocation",async(req,res)=>{
            
            
            console.log(req.body);
            const e =req.body.email;
            const d =req.body.Date;
            const l=req.body.Longitude;
            const la =req.body.latitude;

         
            const doc = new location({ Date:d,email:e,Latitude:la,longitude:l})
           
            doc.save((err, doc) => {
              if (err) {
                res.status(400).json({ user:false  });
              } else {
                res.status(200).json({ user: true ,});
              }
            });
          });

       
          app.post("/UpdateLocation",async(req,res)=>{
            console.log(req.body);
            const id=req.body.id;
            const lo=req.body.long;
            const la=req.body.lat;
           
            
            location.findOneAndUpdate(
              {"_id":id}, 
          
              { 
                  $set: {
                    Latitude:la,longitude:lo}
              },
              {
                  returnNewDocument: true
              }
            , function( error, result){
             if(error)
            {
              res.status(400).send("error Updating");
            }
             else{
              res.status(200).send("Successfully done");   }
            });
            
          });
          
app.listen(3001,()=>{
    console.log("server runing 3001");


})

