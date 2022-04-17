const catchAsync = require('./../utils/catchAsync');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.getClientSecret = catchAsync(async (req , res , next) => {
   const paymentIntent = await stripe.paymentIntents.create({
      amount : req.body.amount,
      currency : 'PKR'
   })
   res.status(200).json({
      status : 'success' ,
      client_secret : paymentIntent.client_secret
   })
});

exports.getStripeApiKey = catchAsync(async(req ,res , next) => {
   res.status(200).json({stripeApiKey : process.env.STRIPE_API_KEY});
})