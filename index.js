const express=require('express')
const app=express()
const connectDB = require('./config/Db')
const PORT=process.env.PORT || 5500

require('./config/db')
connectDB()

const userRoute=require('./routes/userRoute')
app.use('/',userRoute.user_routes)

const adminRoute=require('./routes/adminRoute')  
app.use('/admin',adminRoute)

app.listen(PORT,()=>{
    console.log(`server is listening at port ${PORT}`)
})