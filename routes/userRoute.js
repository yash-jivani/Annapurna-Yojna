const express = require('express')
const user_routes = express()
const body_parser = require('body-parser')
const session = require('express-session')
const path = require('path')
const config = require('../config/config')
const userController = require('../controller/userController')

const multer = require('multer')
// user_routes.use(session({ secret: config.sessionSecret }))
// const auth = require('../middleware/userAuth')
// user_routes.use(flash());

user_routes.use(body_parser.json())
user_routes.use(body_parser.urlencoded({ extended: true }))
user_routes.set('view engine', 'ejs')
user_routes.set('views', './views/user')
user_routes.use(express.static("views"));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname), '../public/user_documents')
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname
        cb(null, name)
    },
    allowedFiles: function (req, file, cb) {
        // Accept images only
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
            req.fileValidationError = 'Only pjpg|JPG|jpeg|JPEG|png|PNG file type are allowed!';
            return cb(new Error('Only txt|jpg|JPG|jpeg|JPEG|png|PNGfile type  are allowed!'), false);
        }
        cb(null, true);
    }
})

const upload = multer({ storage: storage }).fields([{ name: 'election_card' }, { name: 'adhar_card' }, { name: 'ration_card' }, { name: 'bank_passbook' }, { name: 'income_certificate' }, { name: 'land_eight_a_certificate' }, { name: 'mantri_income' }, { name: 'prove_sixteen_plus' }, { name: 'ill_certificate' }])
// const { Cookie } = require('express-session')

user_routes.get('/', userController.loadIndex)
user_routes.get('/index', userController.loadIndex)
user_routes.get('/howtoApply', userController.loadhowtoApply)
user_routes.get('/login', userController.loadLogin)
user_routes.post('/login', userController.verifyLogin)
user_routes.get('/register', userController.loadRegister)
user_routes.post('/register', userController.insertUser)
user_routes.get('/userDetails', userController.loadUserDetails)
user_routes.post('/userDetails', userController.insertUserDetails)
user_routes.get('/userDocument', userController.loadUserDocument)
user_routes.post('/userDocument', upload, userController.insertDocument)
user_routes.get('/userProfile', userController.loadUserProfile)

module.exports = { user_routes }

