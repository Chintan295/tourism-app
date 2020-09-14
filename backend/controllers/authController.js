const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
const catchAsync=require('../utils/catchAsync.js');
const AppError=require('./../utils/appError');
const User = require('../models/users.model.js');

dotenv.config({ path: '../config.env' });

const signInToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE_IN})
}

const createAndSendToken = (user, statusCode, res)=>{
    const token = signInToken(user._id);
    const options = {
        httpOnly : true,
        expiresIn : new Date(Date.now()+process.env.JWT_COOKIE_EXPIRE_TIME*24*60*60*1000)
    }
    res.cookie('jwt', token, options);
    user.password = undefined;
    user.passwordConfirm = undefined;
    res.status(statusCode).json({
        status : 'success',
        token,
        cookie :res.cookie,
        data : {
            user
        }
    })
}

exports.login = catchAsync(async(req, res, next)=>{
   const {email, password} = req.body;
   if(!email || !password){
       return next(new AppError('Please enter email and password',400));
   }
   const user=await User.findOne({email}).select('+password').select('+active');
 
   if( !user || !await user.correctPassword(password, user.password)){
       return next(new AppError('Please provide correct email and password',401));
   }
   createAndSendToken(user, 200, res);     
})

exports.signup = catchAsync(async(req, res, next)=>{
    const newUser = await User.create(req.body);
    createAndSendToken(newUser, 200, res);
})