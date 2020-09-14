const express = require('express');
const userRouter = express.Router();
const authController = require('../controllers/authController')
const User = require('../models/users.model');


userRouter.route('/login').post(authController.login,(req, res)=>{

})
userRouter.route('/signup').post(authController.signup,(req, res)=>{
     
})
userRouter.route('/profile').get((req, res)=>{
    
})

module.exports = userRouter;