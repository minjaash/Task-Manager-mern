const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')

const schema=mongoose.Schema({
    task:{
        type:String,
        required:true,
        unique:false

    },
    sId:{
        type:String,
        required:true,
        unique:false
    }
    
})

const UserTask=mongoose.model('UserTask',schema)
module.exports=UserTask