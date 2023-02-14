const isLogin =async (req,res,next) =>{
    try {

        if(req.session.user_id){}
        else{
            res.redirect('userDetails')
        }
        next()

        
    } catch (error) {
        
        console.log(error.message)
    }
}

const isLogOut =async (req,res,next) =>{
    try {

        if(req.session.user_id)
        {
            res.redirect('/index')
        }
        next()
    } catch (error) {
        console.log(error.message)
        
    }
    next()
}


module.exports={
    isLogin,
    isLogOut
}