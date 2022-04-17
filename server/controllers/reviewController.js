const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Review = require('./../models/reviewMdoel');


//CREATE REVIEW :: POST    /api/v1/review/:id    (private)
exports.createReview = catchAsync(async( req , res , next) => {
   const { review , rating } = req.body;
   if(!review || !rating){
      return next(new AppError('Missing required Credentials.' , 400))
   }

   const isReviewed = await Review.findOne({ user : req.user._id , product : req.params.id });
   if(isReviewed){
      const updatedReview = await Review.findByIdAndUpdate(isReviewed._id , req.body , {
         new : true 
      })
      return res.status(200).json({
         status : "success" ,
         review : updatedReview
      }) 
   }else{
      const newReview = await Review.create({ 
         user : req.user._id , 
         product : req.params.id  ,
         rating , 
         review 
      });
      return res.status(201).json({
         status : 'success',
         review : newReview
      })
   }
});

// GET ALL REVIEWS :: GET    /api/v1/review/all    (Admin)
exports.getAllReviews = catchAsync(async( req , res , next) => {
   const reviews = await Review.find();
   if(!reviews || reviews.length === 0){
      return next(new AppError(' No Review found.' , 404))
   }
   return res.status(200).json({
      status : "Success" ,
      results : reviews.length ,
      reviews 
   })
});

// GET SINGLE REVIEW :: GET    /api/v1/review/:id    (Admin)
exports.getSingleProductReviews = catchAsync(async( req , res , next) => {
   const reviews = await Review.find({ product : req.params.id});
   if(!reviews || reviews.length === 0){
      return next(new AppError('Review not found.' , 404))
   }
   return res.status(200).json({
      status : "Success" ,
      reviews 
   })
});

// DELETE REVIEW :: DELETE    /api/v1/review/:id    (private)
exports.deleteReview = catchAsync(async( req , res , next) => {
   const review = await Review.findById(req.params.id);
   if(!review){
      return next(new AppError('Review not found.' , 404))
   }
   await Review.findByIdAndDelete(req.params.id);
   return res.status(200).json({
      status : "Success" ,
      message : "review deleted successfully."
   })
});