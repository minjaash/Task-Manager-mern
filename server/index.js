//---import the packages and modules
require('dotenv').config();
const express=require("express")
const app=express()
const bcrypt=require('bcryptjs')
const mongoose=require('mongoose')
const cors=require('cors')
const User=require('./models/userModel')
const jwt=require('jsonwebtoken')
const UserTask = require("./models/tasksModel")

//----------middlewares
app.use(cors())
app.use(express.json())

const Mongo_Uri=process.env.MONGODB_URI
const JWT_Secret_Key=process.env.JWT_SECRET_KEY
//--------mongo connection string

mongoose.connect(Mongo_Uri)
.then(res=>{
    console.log("db connected")
})
.catch(err=>{
    console.log("err in conn",err)
})

//------------Register api
app.post('/register',(req,res)=>{
    const user=new User(req.body)
    mongoose.connect(Mongo_Uri)
    .then(dbr=>{
        user.save()
        .then(dbres=>{
            console.log('userSaved',user)
            const token=jwt.sign({name_:dbres.name},JWT_Secret_Key)
            res.json({token})
        })
        .catch(err=>console.log("user not saved",err))
    }) 
    .catch(err=>console.log("err in connection",err))
   
})
//-------------------------login api-------------
app.post('/login', (req, res) => {
  mongoose.connect(Mongo_Uri)
    .then(() => {
      User.findOne({ email: req.body.email })
        .then(dbres => {
          if (dbres && bcrypt.compareSync(req.body.password, dbres.password)) {
            const token = jwt.sign({ name_: dbres.name }, JWT_Secret_Key);
            res.json({ token });
          } else {
            // ❌ Invalid credentials — send proper error
            res.status(401).json({ message: "Invalid email or password" });
          }
        })
        .catch(err => {
          console.log("user does not exist", err);
          res.status(404).json({ message: "User not found" });
        });
    })
    .catch(err => {
      console.log('could not connect to server', err);
      res.status(500).json({ message: "Server error" });
    });
});


//--------------------getting user data to show on profile

app.post('/user',(req,res)=>{
   const authHeader=req.header('Authorization')
   if(!authHeader&&!authHeader.startsWith("Bearer ")){
    res.json({message:"unauthorized access"})
   }
   const token=authHeader.replace("Bearer ","")
   const decoded=jwt.verify(token, JWT_Secret_Key)
   User.findOne({name:decoded.name_})
   .then(dbres=>{
    console.log("/user api ",dbres)
    res.json({dbres})
    
   })
   .catch(err=>{
    console.log("login failure",err)
    res.status(401).json({message:'login failure'})
   })
})

//------------------add task api

app.post("/addTask",(req,res)=>{
    const task=new UserTask(req.body)
    mongoose.connect(Mongo_Uri)
    .then(dbr=>{
        task.save()
        .then(dbres=>{
            console.log("task saved",dbres)
            res.json({message:"task saved ",
                        dbr:dbres})})
        .catch(err=>{
            console.log("addTask api could not save the task",err)
            res.json({message:"could not save the task "+ err})

        })
        
    })
    .catch(err=>{
        console.log("could not connect to server ",err)
        res.json({message:"could not connect to server "+ err})
    })
})
//------------------------api to get Tasks of the users ------------------
app.post("/userTasks",(req,res)=>{
    console.log('usertask api',req.body)
    mongoose.connect(Mongo_Uri)
    .then(dbr=>{
        UserTask.find({sId:req.body.sId})
        .then(dbres=>{
            console.log("userTask api ",dbres)
            res.json({dbres})
        })
        .catch(err=>{
            console.log("no tasks available")
        })
    .catch(err=>{
        console.log('could not connect to db',err)
    })
    })
})

app.delete("/deleteTask",(req,res)=>{
    console.log('tid is',req)
    UserTask.findByIdAndDelete(req.body.tid)
    .then(dbres=>{
        res.json({dbres})
    })
    .catch(err=>{
        console.log('error in deleting the task from server',err)
        res.error({err})
    })
})
//------Edit and update api----

app.post('/getEditTask',(req,res)=>{
    console.log('usertask api',req.body)
    mongoose.connect(Mongo_Uri)
    .then(dbr=>{
        UserTask.findOne({_id:req.body.tid})
        .then(dbres=>{
            console.log("getEditTask api ",dbres)
            res.json({dbres})
        })
        .catch(err=>{
            console.log("getEditTask api-no tasks available")
        })
    .catch(err=>{
        console.log('could not connect to db',err)
    })
    })

})

//update task api----
app.put('/updateTask',(req,res)=>{    
        console.log("req.body is",req.body)

    UserTask.findOne({_id:req.body.editTask._id})
    .then(updateTask=>{
        updateTask.task=req.body.editTask.task
        updateTask.sId=req.body.editTask.sId
        updateTask.save()
                    .then(dbres=>{
                        res.json({dbres})
                    })
                    .catch(err=>{
                        console.log("err while editting",err)
                    })

    })
    .catch(err=>{
        res.json({message:"could not find the task",err})
})
})

//-----Listening on port 4000
app.listen('4000',(req,res)=>{
    console.log("server is running in port 4000")
    })
