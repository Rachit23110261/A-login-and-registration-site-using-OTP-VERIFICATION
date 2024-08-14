const express= require('express')
const router= express.Router()
const signupSchema=require('../validators/authvalidator')
const validate= require('../middlewares/validator-middware')
const {home, register,login,contact,otpverify ,emailverify,otpsend,emailotpsend,Chat,Chatwith}= require('../controller/auth-controller')
const { schema } = require('../models/user')
router.route('/').get(home)
router.route('/register').post(validate(signupSchema),register)
router.route('/login').post(login)
router.route('/contact').post(contact)
router.route('/otpverify').post(otpverify)
router.route('/emailverify').post(emailverify)
router.route('/otpsend').post(otpsend)
router.route('/emailotpsend').post(emailotpsend)
router.route('/chat').post(Chat)
router.route('/chatwith').post(Chatwith)



module.exports= router