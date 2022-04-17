const { getClientSecret, getStripeApiKey } = require('../controllers/paymentController');
const { protect } = require('./../middlewares/protect');
const router = require('express').Router();

router.route('/payment/process' ).post(protect , getClientSecret);
router.route('/stripe/api_key').get(protect , getStripeApiKey);


module.exports = router;