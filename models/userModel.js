const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    // _id: { type: String},

    mobile:
    {
        type:Number,
        required:true,
        unique:true
    },
   
    password:
    {
        type:String,
        required:true
    },
    cpassword:
    {
        type:String,
        required:true
    },
    is_admin:{
        type:Number,
        default:0
    }
})

module.exports=mongoose.model('registration_details',userSchema)