const mongoose=require('mongoose')

const user_rationSchema=new mongoose.Schema({
    adharcardNumber:{
        type:String,
        required:true,
        unique:true
    },
    userName:{
        type:String,
        required:true,
    },
    eighteenPlusMember:{
        type:Number,
        required:true
    },
    rationCardNumber:{
        type:String,
        required:true,
        unique:true
    },

    totalMember:{
        type:Number,
        required:true

    },
    govermentJob:{
        type:String,
        required:true
    },
    ann_inc_Morethan_tenK:{
        type:String,
        required:true
    },
    incomeTax:{
        type:String,
        required:true

    },
    abt_land:{
        type:String,
        required:true
    },
    is_impaired:{
        type:String,
        required:true
    },
    is_bimari:{
        type:String,
        required:true

    },
    occupation:{
        type:String,
        required:true,

    },
    income_certificate_number:{
        type:String,
        required:true,
        // unique:true
    },
    mobile:{
        type:String,
        required:true,
        unique:true
    }
    
})

module.exports=mongoose.model('userRation',user_rationSchema)