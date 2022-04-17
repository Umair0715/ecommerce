const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/appError');
const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');


exports.protect = catchAsync(async (req , res , next) => {
   let token ;
   if(req.cookies.token){
      token = req.cookies.token;
   }
   if(!token){
      return next(new AppError('you are not logged in. please login to get access.' , 400))
   }
   
   const decoded = jwt.verify(token , process.env.JWT_SECRET);
   const user = await User.findById(decoded._id);
   if(!user){
      return next(new AppError('you are not an Authorized User. please login again' , 400))
   }
   req.user = user;
   next();
});

exports.isAdmin = (req , res , next) => {
   if(req.user.isAdmin){
      return next();
   }
   return next(new AppError('You are not allowed to perform this action.'))
}