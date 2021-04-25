const User=require('./../models/users.model')
const catchAsync = require('./../utils/catchAsync')
const multer=require('multer');
const Jimp = require('jimp');
var path = require('path');
const AppError=require('./../utils/appError')
const factory=require('./handlerFactory');

const filterObj=(obj, ...filters)=>{
    const newObj={};
    Object.keys(obj).forEach(el=>{
        if(filters.includes(el)) newObj[el]=obj[el]
    })
    return newObj;
}

const multerStorage=multer.memoryStorage();
const filter=(req,file,cb)=>{
    if(file.mimetype.startsWith('image')){
        cb(null,true)
    }else
    cb(new AppError('Upload image only',400),false)
}
const upload=multer({
    storage:multerStorage,
    fileFilter:filter,
    limits:{
        fileSize:5000000
    }
});

exports.updateMe=catchAsync(async(req,res,next)=>{
    if(req.body.password || req.body.passwordConfirm){
        next(new AppError('This is not For changing the password',400,res));
    }
    const filterBody=filterObj(req.body,'name','email');
    if(req.file)filterBody.photo=req.file.filename;
    const user=await User.findByIdAndUpdate(req.user._id,filterBody,{runValidators:true,new :true}).select('-__v')
    res.status(200).json({
        status:'success',
        data:{
            user
        }
    })
});

exports.uploadPhoto= upload.single('photo');
exports.resizeUploadPhoto=catchAsync(async(req,res,next)=>{
    if(!req.file) return next();
    req.file.filename=`user-${req.user._id}.jpeg`;
    Jimp.read(req.file.buffer,(err,img)=>{
        if(err){
            next(new AppError('Error while Uploading Photo',400,res))
        }
        img.resize(500,500).quality(80).write(`img/users/${req.file.filename}`)
    });
    next();
});

exports.getMe=(req,res,next)=>{
    req.params.id=req.user.id;
    next();
}
exports.getPhoto=(req, res, next)=>{
    res.sendFile(path.resolve(__dirname+`/../img/users/user-`+req.user.id+`.jpeg`))
}
exports.getUser = factory.getOne(User);
exports.getAllUsers = factory.getAll(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);

exports.deleteMe=catchAsync(async (req,res,next)=>{
    await User.findByIdAndUpdate(req.user._id,{active:false})
    res.status(200).json({
        status:'success',
        data:null
    })
})
