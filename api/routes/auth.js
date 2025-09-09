const express = require("express");
const router = express.Router();
const {body} = require("express-validator")

const authController = require("../controllers/auth")

const authMiddleware = require("../middlewares/is-auth")

const User = require("../models/user")

//POST /register
router.post("/register",[
        body("email").isEmail().withMessage("Please enter a valid email").custom((value,{req})=>{
            return User.findOne({email: value}).then(userDoc => {
                        if(userDoc){
                             return Promise.reject("E-mail is already exist")
                        }
                })
        }),
        body("username").trim().isLength({min: 3}).withMessage("Username is too short!").isLength({max: 15})
        .withMessage("Username is too long!").custom((value,{req})=>{
            return User.findOne({username: value}).then(userDoc => {
                        if(userDoc){
                             return Promise.reject("Username is already exist")
                        }
                })
        }),
        body("password").trim().isLength({min: 5}).withMessage("Password is too short")
   ],authController.register)

//POST /login
router.post("/login",[
        body("email").isEmail().withMessage("Please enter a valid email").custom((value,{req})=>{
           return User.findOne({email: value}).then(userDoc =>{
                if(!userDoc){
                        return Promise.reject("Email not exist!")
                }})
                }),
        body("password").trim().isLength({min: 5}).withMessage("Password is too short")
],authController.login)

//GET /status
router.get("/status",authController.checkStatus)

module.exports = router;
