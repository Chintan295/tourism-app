const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/appError')
const stripe = require('stripe')(`sk_test_51HqUpuFB9dJUDyrAtxx3q1dagWx1Id0b5N5emJDQDUPHyTRelnWevTfLx5GJTcLJyXjsdUQh2Vl9kkzNVLYCn3sU008BJ1dTZP`)
const Tour = require('../models/tour.model');
const Booking = require('../models/booking.model');
const factory = require('./handlerFactory');


exports.getSession = catchAsync(async (req, res, next) => {
    const tour = await Tour.findById(req.params.tourId);
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        success_url: `http://localhost:3000/MyBookings?tour=${req.params.tourId}&user=${req.user.id}&price=${tour.price}`,
        cancel_url: `http://localhost:3000/tour/${tour.slug}`,
        customer_email: req.user.email,
        client_reference_id: req.params.tourId,
        line_items: [{
            name: `${tour.name} Tour`,
            description: tour.summary,
            images: [`https://www.natours.dev/img/tours/tour-2-1.jpg`],
            amount: tour.price*100 ,
            currency: 'inr',
            quantity: 1,
        }]
    });
    res.status(200).json({
        status: 'success',
        session
    })
})

exports.createBookingCheckout = catchAsync(async (req, res, next) => {
    const { user, tour, price } = req.query;
    if (!user && !tour && !price) return next();
    await Booking.create({ user, tour, price });

    res.status(200).json({url:req.originalUrl.split('?')[0]});
})

exports.getMyTours = catchAsync(async (req, res, next) => {
    //1) find all the booking of this user
    const Bookedtour = await Booking.find({ user: req.user.id });
    const tourIds = Bookedtour.map(el => el.tour);
    const tours = await Tour.find({ _id: { $in: tourIds } })

    res.status(200).json({
        tours
    })
})

exports.getAllBooking = factory.getAll(Booking);
exports.createBooking = factory.createOne(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);
exports.getBooking = catchAsync(async (req, res, next) => {
    const AllUser = await Booking.find({ tour: req.params.id });
    console.log(AllUser);
    res.status(200).json({
        status: 'success',
        user: AllUser
    })
})