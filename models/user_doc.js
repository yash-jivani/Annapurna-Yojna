const mongoose=require('mongoose')

const user_Doc_Schema=new mongoose.Schema({
    election_card   :{
        type:String,
        required:true,
    },
    adhar_card:{
        type:String,
        required:true,
    },
    ration_card:{
        type:String,
        required:true,
    },
    bank_passbook:{
        type:String,
        required:true,
    },
    income_certificate:{
        type:String,
        required:true,
    },
    land_eight_a_certificate:{
        type:String,
        required:true,
    },
    mantri_income:{
        type:String,
        required:true,
    },
    prove_sixteen_plus:{
        type:String,
        required:true,

    },
    ill_certificate:{
        type:String,
        required:true,
    }
    
})

module.exports=mongoose.model('user_Doc_details',user_Doc_Schema)