const express = require('express');
const router = express.Router();
const authController = require('./../controllers/authController');
const tourController = require('../controllers/tourController');
const viewController = require('../controllers/viewController');


router.route('/top-5-cheap').get(tourController.aliasTopTours, tourController.getAllTours);
router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthy-plan/:year').get(tourController.getMonthlyPlan);

router.route('/createTour').post(authController.protect, authController.restrict('admin', 'lead-guide'), tourController.createTour);
router.route('/').get(tourController.getAllTours)

router.route('/:slug')
    .get(viewController.getTour)
    .patch(authController.protect, authController.restrict('admin', 'lead-guide'),
        tourController.uploadTourPhoto,
        tourController.resizeTourPhoto
        , tourController.updateTour)
    .delete(authController.protect, authController.restrict('admin', 'lead-guide'), tourController.deleteTour);


module.exports = router;