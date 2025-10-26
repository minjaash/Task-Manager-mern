const mongoose=require('mongoose')
const bcrypt=require('bcrypt')

const schema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:false

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:false
    }
    
})
 //----Hashing the password using bcrypt
schema.pre('save',async function(next){
    if(this.isModified('password')){
     this.password=await bcrypt.hash(this.password,8)   
    }
    next();
})

const User=mongoose.model('User',schema)
module.exports=User