const Tour=require('./../models/tour.model');
const AppError=require('./../utils/appError');
const catchAsync=require('./../utils/catchAsync');


exports.getOverview=catchAsync(async (req,res)=>{
    const tours=await Tour.find();
    res.status(200).json('overview',{
        title:"All Tours",
        tours
    })
});

exports.topTour = catchAsync(async (req,res)=>{
    const tours=await Tour.find({}).sort({ratingsAverage:-1}).limit(3);
    res.status(200).json({
        tours
    })
});


exports.getTour=catchAsync (async (req,res,next)=>{
    const tour=await Tour.findOne({slug:req.params.slug}).populate({
        path:'reviews',
        fields:'rating review user'
    });
    if(!tour){
        next(new AppError('Cannot Find This Tour',400,res));
    }
    res.status(200).json({
        message:"success",
        tour
    })
});

exports.login=catchAsync(async(req,res)=>{
    res.status(200).render('login');
})



exports.me=(req,res)=>{
    res.status(200).render('account',{
        title:'Your Account'
    });
}