const user = require('../models/userModel')
const userRation = require('../models/userRation')
const user_Doc = require('../models/user_doc')
// const user_Doc=require('../models/userDocument')
const bcrypt = require('bcrypt')
// const { request } = require('express')
const securePassword = async (password, next) => {
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        return passwordHash
    } catch (error) {
        console.log(error.message)
    }
}

const loadIndex = async (req, res, next) => {
    try {
        res.render('index')
        // next()
    } catch (error) {
        console.log(error.message)
    }
}

const loadhowtoApply = async (req, res, next) => {
    try {
        res.render('howtoApply')
        // next()
    } catch (error) {
        console.log(error.message)
    }
}

const loadLogin = async (req, res, next) => {
    try {
        res.render('login')
        // next()
    } catch (error) {
        console.log(error.message)
    }
}

const loadRegister = async (req, res, next) => {
    try {
        res.render('register')
        // next()
    } catch (error) {
        console.log(error.message)
    }
}

const loadUserProfile = (req, res, next) => {
    try {
        res.render('userProfile')
        // next()
    } catch (error) {
        console.log(error.message)
    }

}
const insertUser = async (req, res, next) => {
    try {
        const spassword = await securePassword(req.body.password)
        const sConfirmpassword = await securePassword(req.body.cpassword)
        const user_reg_details = new user({
            email: req.body.email,
            mobile: req.body.mobile,
            password: spassword,
            cpassword: sConfirmpassword,
            is_admin: 0
        })

        const user_data = await user_reg_details.save()

        if (user_data) {
            // alert('Your registration has been successfull ')
            // alert('Your registration has been successfull')
            res.render('login', { message: "Your registration has been successfull" })
            // next()
        }
        else {
            res.render('register', { message: "Your registration has been failed" })
            // next()
        }
    } catch (error) {
        console.log(error.message)
    }
}

// let myIdentity = ""

const verifyLogin = async (req, res, next) => {
    try {
        const mobile = req.body.mobile
        const password = req.body.password
        const userCredentials = await user.findOne({ mobile: mobile })

        if (userCredentials) {
            const passwordMatch = await bcrypt.compare(password, userCredentials.password)

            if (userCredentials.is_admin) {
                return res.render('homeAdmin')
            }


            if (passwordMatch) {
                console.log(userCredentials)

                // req.session.user_id=userCredentials._id
                res.render('userDetails', { mobile: mobile })
            } else {
                res.render('login', { message: 'mobile and password are incorrect' })
            }
        }
        else {
            res.render('login', { message: 'mobile and password are incorrect' })
        }
    } catch (error) {
        console.log(error.message)
    }
}
const loadUserDetails = async (req, res, next) => {
    try {
        // const userData=await user.findById({_id:req.session.user_id})
        res.render('userDetails')
        // next()
    } catch (error) {
        console.log(error.message)
    }
}

const loginLoad = async (req, res, next) => {
    try {
        res.render('login')
        // next()
    } catch (error) {
        console.log(error.message)
    }
}

// const userIdentityInput = window.getElementById('userIdentity')
// console.log(userIdentityInput)


const insertUserDetails = async (req, res, next) => {
    try {

        const rationCard = req.body.rationCardNumber
        console.log(rationCard)
        const result = await userRation.findOne({ "rationCardNumber": rationCard })
        console.log("Result: ", result)

        if (result) {
            return res.render('duplicateRationCardNumber')
            // next()
        }

        const user_ration_details = new userRation({
            adharcardNumber: req.body.adharcardNumber,
            userName: req.body.userName,
            eighteenPlusMember: req.body.eighteenPlusMember,
            rationCardNumber: req.body.rationCardNumber,
            totalMember: req.body.totalMember,
            govermentJob: req.body.govermentJob,
            ann_inc_Morethan_tenK: req.body.ann_inc_Morethan_tenK,
            incomeTax: req.body.incomeTax,
            abt_land: req.body.abt_land,
            is_impaired: req.body.is_impaired,
            is_bimari: req.body.is_bimari,
            occupation: req.body.occupation,
            income_certificate_number: req.body.income_certificate_number,
            mobile: req.body.mobile
        })

        const user_ration_data = await user_ration_details.save();
        console.log("User RATION DATA", user_ration_data)
        if (user_ration_data) {
            return res.redirect('userDocument')
            
            // next()
        }
        else {
            return res.render('userDetails', { message: "Your ration details has been failed" })
            // next()
        }
        // next()
    } catch (error) {
        return res.render('userDetails', { message: "CATCH BLOCK " })
        // next()
    }
    // next()

}
const loadUserDocument = async (req, res, next) => {
    try {
        res.render('userDocument')
        next()
    } catch (error) {
        console.log(error.message)
    }
}

const insertDocument = async (req, res, next) => {
    try {
        const user_doc_details = new user_Doc({
            election_card: req.files.election_card[0].filename,
            adhar_card: req.files.adhar_card[0].filename,
            ration_card: req.files.ration_card[0].filename,
            bank_passbook: req.files.bank_passbook[0].filename,
            income_certificate: req.files.income_certificate[0].filename,
            land_eight_a_certificate: req.files.land_eight_a_certificate[0].filename,
            mantri_income: req.files.mantri_income[0].filename,
            prove_sixteen_plus: req.files.prove_sixteen_plus[0].filename,
            ill_certificate: req.files.ill_certificate[0].filename
        })

        const user_doc_details_data = await user_doc_details.save()
        if (user_doc_details_data) {
            res.render('index', { message: "Your Ration details has been save successfull" })
            next()
        }
        else {
            res.render('userDocument', { message: "Your ration details has been failed" })
        }
    } catch (error) {
        console.log(error.message)
    }
}



module.exports = { loadIndex, loadhowtoApply, loadLogin, loadRegister, insertUser, verifyLogin, loadUserDetails, insertUserDetails, loadUserDocument, insertDocument, loadUserProfile }