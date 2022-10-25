const mongoose=require("mongoose")

const admin_info=require("./admin_info")

const user_info=require("./user_info")
// const bcrypt=require("bcryptjs")


const employeeSchema=new mongoose.Schema(
    {
        
        mobile:
        {
            type:Number,
            required:true,
            unique:true
        },
        email:
        {
            type:String,
            required:true,
            unique:true,
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
        // otp:
        // {
        //     type:Number,
        //     required:true
        // }
      
        
    }
)



const Register=new mongoose.model("Register",employeeSchema)

module.exports=Register;