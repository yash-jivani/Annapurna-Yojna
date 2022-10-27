const express = require("express");

const app = express();

const path = require("path");

const hbs = require("hbs")
const router = express.Router();

const session = require("express-session")

const bcrypt = require("bcryptjs")

require("./Data Base/connection")

const Register = require("../src/Models/register")

const User_detail = require("../src/Models/user_doc_details")

const admin_detail = require("../src/Models/admin_info")

const port = process.env.PORT || 5505;



const staticpath = path.join(__dirname, "./Public");

const templatesPath = path.join(__dirname, "./Templates/views")

const partialPath = path.join(__dirname, "./templates/partials")



app.use(express.static(staticpath));

app.use(express.json());

// app.engine={'hbs', hbs{}}

app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'hbs')

app.set("views", templatesPath)

hbs.registerPartials(partialPath)




app.get("/*index", (req, res) => {
    res.render('index')

})
app.get("*/register", (req, res) => {
    res.render('register')
})
app.get("*/login", (req, res) => {
    res.render('login')
})

app.get("*/form", (req, res) => {
    res.render('form')
})
app.get("*/admin", async (req, res) => {
    res.render('admin')

})

app.get("*/applications", async (req, res) => {
    res.render('applications')
})
app.get("*/howtoapply", async (req, res) => {
    res.render('howtoapply')
})

app.get("*/adminlogin", (req, res) => {
    res.render('adminlogin')
})

app.get("*/userprogess", (req, res) => {
    res.render('userprogess')
})



app.post("/register", async (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.cpassword;



        if (password === cpassword) {

            const registerUser = new Register({


                mobile: req.body.mobile,
                email: req.body.email,
                password: req.body.password,
                cpassword: req.body.cpassword,
            });

            const registeredUser = await registerUser.save();
            console.log(registerUser)
            res.status(200).render('form')


        }
        else {
            console.log("no match password")
        }
    }
    catch (e) {
        res.status(400).send(e)

    }

})
app.post("/login", async (req, res) => {
    try {
        console.log("Helllo")

        const mobile = req.body.mobile;

        console.log(mobile)

        const password = req.body.password;

        console.log(password)

        // here first email is foe user input email and second one is for vat.
        const useremail = await Register.findOne({ mobile: mobile })
        console.log(useremail)

        if (useremail.password === password) {
            res.status(201).render('userprogess')
            console.log("Success")
        }
        else {
            res.send("Invalid Login Details")
        }

    }
    catch (e) {
        res.status(400).send("Something went wrong")

    }
})

app.post("/form", async (req, res) => {

    try {
          const adharnum=req.body.adharnum
          console.log(adharnum)
          const adharname=req.body.adharname
          console.log(adharname)
          const address=req.body.address
          console.log(address)
          const occupassion=req.body.occupassion
          console.log(occupassion)
          const annualIncome=req.body.annualIncome
          console.log(annualIncome)
          const dobfirst=req.body.dob
          console.log(dobfirst)
          const ann_cer_number=req.body.ann_cer_number
          console.log(ann_cer_number)
          const user_mobile=req.body.user_mobile
          console.log(user_mobile)
          const user_email=req.body.user_email
          console.log(user_email)

        const userDoc = new User_detail({

            adharnum: req.body.adharnum,
            adharname: req.body.adharname,
            adharimg:req.body.adharimg,
            address: req.body.address,
            occupassion: req.body.occupassion,
            annualIncome: req.body.annualIncome,
            ann_cer_img:req.body.ann_cer_img,
            dob: req.body.dob,
            ann_cer_number: req.body.ann_cer_number,
            user_mobile: req.body.user_mobile,
            user_email: req.body.user_email,
        })
        const dob = req.body.dob;
        console.log(dob);

        var birthDate = new Date(dob);
        console.log(" birthDate" + birthDate);

        var difference = Date.now() - birthDate.getTime();

        var ageDate = new Date(difference);
        var calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
        console.log(calculatedAge)


        if (calculatedAge < 65) {
            res.send("તમારી ઉંમર 65 વર્ષથી ઓછી છે તમે આ યોજના માટે લાગુ નથી")
        }


         const userDocDetails=await userDoc.save();
         console.log(userDocDetails)
         res.status.render('index')



    } catch (e) {
        res.status(400).send("તમારું ફોર્મ સફળતાપૂર્વક સબમિટ કરવામાં આવ્યું છે")


    }
})


app.get("/admin/:id", async (req, res) => {

    try {


        const _id = req.params.id;

        const userData = await User_detail.findById(_id);

        console.log(userData)
        if (!userData) {
            return res.status(200).send();
        }
        else {

            const useradharname = userData.adharname
            const useradharnum = userData.adharnum
            const userannualinc = userData.annualIncome
            const usernumber = userData.user_mobile
            //    const usernum=userData.
            res.render('applications', { showname: useradharname, showadharnum: useradharnum, showannual: userannualinc, shownumber: showadharnum })// res.send(userData.adharnum);
        }
        // console.log(User_detail.req.body)


    } catch (e) {
        res.send(e)
    }

})


// app.get("/admin", (req,res)=>{
//     const dbo=db.db(User_detail);
//     dbo.collection("User_detail").find({}).toArray(function(err, result) {
//         if (err)
//         {
//             throw err;

//         } 
//         else{

//             console.log(result);
//         }
//     }

// } )


app.post("/adminlogin", async (req, res) => {
    try {
        console.log("Helllo")

        const adminusername = req.body.adminusername;

        console.log(adminusername)

        const adminpassword = req.body.adminpassword;

        console.log(adminpassword)

        // here first email is foe user input email and second one is for vat.
        const adminlog_detail = await admin_detail.findOne({ adminusername: adminusername })
        console.log(adminlog_detail)

        if (adminlog_detail.adminpassword === adminpassword) {
            res.status(201).render("admin")
            console.log("Success")
        }
        else {
            res.send("Invalid Login Details")
        }

    }
    catch (e) {
        res.status(400).send("Invalid Mobile")

    }
})


app.listen(port, () => {
    console.log("succesfull connection Done With Port")
})
