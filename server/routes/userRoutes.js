const router = require('express').Router();
const authController = require('./../controllers/authController');
const { protect , isAdmin } = require('./../middlewares/protect');

// AUTH
router.route('/register').post(authController.register);
router.route('/login').post(authController.login);
router.route('/logout').get(authController.logout);
router.route('/forgotPassword').post(authController.forgotPassword);
router.route('/resetPassword/:token').post(authController.resetPassword);

// USER
router.route('/profile').get( protect , authController.getUserProfile)
router.route('/updateProfile').put( protect , authController.updateProfile)
router.route('/updatePassword').put( protect , authController.updatePassword);
router.route('/avatar/:id').put(authController.addAvatar);

router.route('/all')
   .get(protect , isAdmin , authController.getAllUsers)
router.route('/:id')
   .get(protect , isAdmin , authController.getSingleUser)
   .put(protect , isAdmin , authController.updateUser)
   .delete(protect , isAdmin , authController.deleteUser)


module.exports = router;