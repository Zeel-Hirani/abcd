const express = require("express");
const router = express.Router();
const signupcontroller = require("../../controller/signup.controller")
// const loginValidator1 = require("../../utils/errorhandling")
const{check}= require('express-validator')

router.post("/signup", signupcontroller.signupuser);


router.post("/login",[
 check('email', 'Email length should be 10 to 20 characters')
.isEmail({minDomainSegments:2,tlds:{allow:['com','net']}}).isLength({ min: 10, max: 20 }),
 check('password', 'Password length should be 6 to 10 characters')
.isLength({ min: 6, max: 10 })
],
signupcontroller.Loginuser)

module.exports = router;