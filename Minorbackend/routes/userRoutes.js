const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.protect, authController.logout);
router.post('/forgetPassword',authController.forgetPassword);

router.patch('/updatePassword',authController.protect,authController.updatePassword);
router.patch('/updateMe',authController.protect,userController.uploadPhoto,userController.resizeUploadPhoto,userController.updateMe);
router.delete('/deleteMe',authController.protect,userController.deleteMe);
router.get('/me',authController.protect,userController.getMe,userController.getUser);
router.get('/photo',authController.protect, userController.getPhoto);

router
    .route('/')
    .get(authController.protect, authController.restrict('admin'),userController.getAllUsers)

router
    .route('/:id')
    .get(authController.restrict('admin'),userController.getUser)
    .patch(authController.restrict('admin'),userController.updateUser)
    .delete(authController.restrict('admin'),userController.deleteUser);

module.exports = router;