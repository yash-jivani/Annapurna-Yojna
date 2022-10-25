const mongoose=require("mongoose")


const user_prsnl_doc= new mongoose.Schema({
    adharnum:{
        type:Number,
        require:true,
        unique:true,
    },
    adharname:{
        type:String,
        require:true,

    },
    adharimg:
    {
        data: Buffer,
        contentType: String,
        
    },
  
    address:{
        type:String,
        require:true,

    },
    occupassion:{
        type:String,
        require:true,

    },
    annualIncome:{
        type:Number,
        require:true,
    },
    ann_cer_img:{
        data: Buffer,
        contentType: String,
        
    },
   
    dob:{
        type:Date,
        require:true,
    },
   
    ann_cer_number:{
        type:Number,
        require:true,
        unique:true,

    },

    user_mobile:{
        type:Number,
        required:true,
        unique:true
    },
    user_email:{
        type:String,
        required:true,
        unique:true,

    }

})

const User_detail_doc=new mongoose.model("User_detail_doc",user_prsnl_doc)

module.exports=User_detail_doc;