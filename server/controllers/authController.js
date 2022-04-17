const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');
const sendMail = require('../utils/email');
const crypto = require('crypto');
const cloudinary = require('cloudinary').v2;


const signToken = id => {  
   return jwt.sign({ _id : id } , process.env.JWT_SECRET , {
      expiresIn : process.env.JWT_EXPIRES_IN
   })
}

const sendToken = (user , statusCode , res) => {
   const token = signToken(user._id);
   const cookieOptions = {
      expires : new Date(
         Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly : true 
   }
   if(process.env.NODE_ENV === 'production') cookieOptions.secure = true ;

   res.cookie('token' , token , cookieOptions);
   res.status(statusCode).json({
      status : "success" ,
      user : {
         _id : user._id ,
         name : user.name , 
         email : user.email , 
         isAdmin : user.isAdmin ,
         createdAt : user.createdAt ,
         avatar : user.avatar
      } ,
      token
   })

}

// REGISTER USER
exports.register = catchAsync(async( req , res , next) => {
   const { name , email , password } = req.body;
   if(!name || !email || !password){
      return next(new AppError('Missing required credentials.' , 400))
   }
   const userExist = await User.findOne({ email });
   if(userExist){
      return next(new AppError('This email is already taken. try another.' , 400))
   }
   const user = await User.create({ 
      name ,
      email , 
      password  ,
      avatar : {
         public_id : 'default_id' , 
         url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLIbLTGKz4waJGU2vkbhQkRavjf2OdeY7Eo4l8yFnggdF3fX1bUF4FEUP13o34ioSCm-M&usqp=CAU'
      }
   });

   sendToken(user , 200 , res);
   
});

// ADD AVATAR 
exports.addAvatar = catchAsync(async ( req , res , next) => {
   let myCloud = await cloudinary.uploader.upload(req.files.avatar.tempFilePath , {
      folder: 'avatars' ,
      width: 150 ,
      crop : 'scale',
      public_id: req.params.id,
   })
   const user = await User.findById(req.params.id);
   if(!user){
      return next(new AppError('user does not exist.' , 404))
   }
   
   const updatedUser = await User.findByIdAndUpdate(req.params.id , {
      avatar : {
         public_id : myCloud.public_id , 
         url : myCloud.secure_url
      }
   } , { new : true })
   
   sendToken(updatedUser , 200 , res)
   
})

// LOGIN USER
exports.login = catchAsync(async (req , res , next) => {
   const { email , password } = req.body;
   if(!email || !password){
      return next(new AppError('Missing required credentials' , 400))
   }
   const user = await User.findOne({ email });

   if(!user || !await user.comparePassword(password)){
      return next(new AppError('Wrong Email or Password.' , 400));
   }
   
   sendToken(user , 200 , res);

});


// LOGOUT USER
exports.logout = catchAsync(async ( req , res , next) => {
   res.cookie('token' , null , {
      expires : new Date(Date.now()) ,
      httpOnly : true 
   });
   res.status(200).json({
      status : 'success' , 
      message : 'Logged out successfully.'
   })
});


// FORGOT PASSWORD
exports.forgotPassword = catchAsync(async ( req , res , next) => {
   const { email } = req.body;
   const user = await User.findOne({ email });
   if(!user){
      return next(new AppError('User does not exist', 404))
   }
   const resetToken = user.setPasswordResetToken();
   await user.save({ validateBeforeSave : false });

   try{

      const resetURL = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`
      const message = `You are requested for forgot password. \n\n please click on the link given below to reset your password \n\n 
      ${resetURL}
      \n\n if you are not requested then please ignore this email.
      \n\n NOTE: Link will expire after 10 minutes`;

      await sendMail({ email , message })
      res.status(200).json({
         status : 'success' ,
         message : `Email sent to ${email}. please check your email to reset Your password.`
      })
   }catch(err){
      user.passwordResetToken = undefined;
      user.passwordResetTokenExpire = undefined;
      await user.save({ validateBeforeSave : false });
      return next(new AppError( err.message || 'something went wrong', 500));
   }

});


// RESET PASSWORD
exports.resetPassword = catchAsync(async ( req , res , next) => {
   const hashToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
   const user = await User.findOne({ passwordResetToken : hashToken , passwordResetTokenExpire : { $gt : Date.now() }});
   if(!user){
      return next(new AppError('Password reset Link is expired. please request again.' , 400))
   }

   if(req.body.password !== req.body.confirmPassword){
      return next(new AppError('password does not match.' , 400))
   }
   user.password = req.body.password;
   user.passwordResetToken = undefined;
   user.passwordResetTokenExpire = undefined;
   await user.save({ validateBeforeSave : false });
  
   sendToken(user , 200 , res);
   
})


// USER PROFILE
exports.getUserProfile = catchAsync(async ( req , res , next) => {
   const user = await User.findById(req.user._id);
   if(!user){
      return next(new AppError('user not found.' , 404))
   }
   res.status(200).json({
      status : 'success' ,
      user 
   })
});

// UPDATE PROFILE
exports.updateProfile = catchAsync(async ( req , res , next) => {
   const user = await User.findById(req.user._id);
   if(!user){
      return next(new AppError('user not found.' , 404))
   }
   if(req.body.name) user.name = req.body.name;
   if(req.body.email) user.email = req.body.email;
   
   const updatedUser = await user.save({ validateBeforeSave : false });

   res.status(200).json({
      status : 'success' ,
      user : updatedUser
   })
});

// UPDATE PASSWORD 
exports.updatePassword = catchAsync(async ( req , res , next) => {
   const user = await User.findById(req.user._id);
   if(!user){
      return next(new AppError('user not found.' , 404))
   }
   const { oldPassword , newPassword , confirmPassword } = req.body;
   if(!await user.comparePassword(oldPassword)){
      return next(new AppError('Incorrect old password.'))
   }
   if(newPassword !== confirmPassword){
      return next(new AppError('Password does not match.' , 400))
   }

   user.password = newPassword;
   await user.save({ validateBeforeSave : false });
   res.status(200).json({
      status : 'success' ,
      message : 'Password Updated successfully.'
   })
});

// ALL USERS      (Admin)
exports.getAllUsers = catchAsync(async ( req , res , next) => {
   const users = await User.find();
   if(!users || users.length === 0){
      return next(new AppError('no user found.' , 404))
   }
   res.status(200).json({
      status : 'success' ,
      results : users.length ,
      users 
   })
});

// GET SINGLE USER      (Admin)
exports.getSingleUser = catchAsync(async ( req , res , next) => {
   const user = await User.findById(req.params.id);
   if(!user){
      return next(new AppError('user not found.' , 404))
   }
   res.status(200).json({
      status : 'success' ,
      user 
   })
});

// UPDATE USER    (Admin)
exports.updateUser = catchAsync(async ( req , res , next) => {
   const user = await User.findById(req.params.id);
   if(!user){
      return next(new AppError('user not found', 404))
   }
   if(req.body.name) user.name = req.body.name;
   if(req.body.isAdmin){
      user.isAdmin = req.body.isAdmin ;
   }
   await user.save({ validateBeforeSave : false });
   res.status(200).json({
      status : 'success' ,
      message : 'User Updated successfully.', 
      user
   });
})


// DELETE USER      (Admin)
exports.deleteUser = catchAsync(async ( req , res , next) => {
   const user = await User.findById(req.params.id);
   if(!user){
      return next(new AppError('user not found.' , 404))
   }
   await cloudinary.uploader.destroy(user.avatar.public_id);
   await user.remove();
   res.status(200).json({
      status : 'success' ,
      message : 'user removed successfully.'
   })
});

