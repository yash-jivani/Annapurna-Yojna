const mongoose=require("mongoose")


const admin_data= new mongoose.Schema({
    adminusername:{
        type:Number,
        require:true,
        
    },
    adminpassword:{
        type:String,
        require:true,

    }

})

const Admin_detail=new mongoose.model("Admin_detail",admin_data)

module.exports=Admin_detail;