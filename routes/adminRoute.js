const express = require('express')
const admin_routes = express()
const body_parser = require('body-parser')
const session = require('express-session')
const path = require('path')
const config = require('../config/config')



// const auth = require('../middleware/auth')
// admin_routes.use(flash());

admin_routes.use(body_parser.json())

admin_routes.use(body_parser.urlencoded({ extended: true }))
admin_routes.set('view engine', 'ejs')
admin_routes.set('views', './views/admin')
admin_routes.use(express.static("views"));

const adminController = require('../controller/adminController')
admin_routes.get('/home', adminController.home)
admin_routes.get('/exportuser', adminController.exportUsers)
module.exports = admin_routes

