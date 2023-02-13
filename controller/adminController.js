const user = require('../models/userModel')
const userRation = require('../models/userRation')
const user_Doc = require('../models/user_doc')
const bcrypt=require('bcrypt')
const excelJs = require('exceljs')
const Admin = require('./../models/adminModel')


const exportUsers = async (req, res) => {
    try {
        const workbook = new excelJs.Workbook();
        const worksheet = workbook.addWorksheet("Total Users")
        worksheet.columns = [
            { header: "S no.", key: "s_no",  },
            { header: "adharcardNumber", key: "adharcardNumber", style: {numFmt:'Number'} },
            { header: "Name", key: "userName" },
            { header: "18+ members", key: "eighteenPlusMember" },
            { header: "RationCardNumber", key: "rationCardNumber", style: {numFmt:'Number'} },
            { header: "totalFamilyMember", key: "totalMember" },
            { header: "is_govermentJob", key: "govermentJob" },
            { header: "is_ann_inc_Morethan_tenK", key: "ann_inc_Morethan_tenK" },
            { header: "incomeTax.", key: "incomeTax" },
            { header: "about_land", key: "abt_land" },
            { header: "is_impaired", key: "is_impaired" },
            { header: "is_bimari", key: "is_bimari" },
            { header: "occupation", key: "occupation" },
            { header: "income_certificate_number", key: "income_certificate_number", style: {numFmt:'Number'} },
            { header: "mobile", key: "mobile", style: {numFmt:'Number'} },

        ]
        let counter = 1;
        const userData = await userRation.find({})
        // console.log(userData)
        userData.forEach((user) => {
            user.s_no = counter;
            worksheet.addRow(user)
            counter++;
        })
        worksheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true }
        })
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheatml.sheet"
        )
        res.setHeader("Content-Disposition", `attachment; filename=users.xlsx`);
        return workbook.xlsx.write(res).then(() => {
            res.status(200)
        })
    } catch (error) {
        console.log(error.message)
    }
}

const loadLogin=async(req,res,next)=>{
    try {
        res.redirect('/admin/login')
        
    } catch (error) {
        console.log(error.message)
    }
}

const verifyLogin=async(req,res,next)=>{
    try {
        const mobile=req.body.mobile
        const password=req.body.password

        const userData=await user.findOne({mobile:mobile})

        if(userData){

            const passwordMatch=await bcrypt.compare(password,userData.password)
            if(passwordMatch)
            {
                if(userData.is_admin===1){
                    req.session.user_id=userData.id
                    res.redirect('/admin/exportuser')
                }else{
                    res.redirect('login', {message:'Email and password is incorrect'})
                }
            }
            else{
                res.render('login', {message:'Email and password is incorrect'})
            }
        }
        else{
            res.render('login', {message:'Email and password is incorrect'})
        }

        
    } catch (error) {

        console.log(error.message)
        
    }
}

const loadDashboard=async(req,res,next)=>{
    try {
        res.render('adminhome')
    } catch (error) {
        
        console.log(error.message)
        
    }
}

const logout=async(req,res,next)=>{
    try {
        req.session.destroy()
        res.redirect('/admin')
        
    } catch (error) {
        console.log(error.message)
        
    }
}

const home = async (req, res, next)=>{
    try{
        res.render('homeAdmin');
    }catch(err){
        console.log(err)
    }
}

module.exports={loadLogin,verifyLogin,loadDashboard,logout,home,exportUsers}
