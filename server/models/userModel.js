const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
   name : {
      type : String ,
      required : true ,
      maxlength : [30 , 'username less than 30 characters'] ,
      minlength : [3 , 'username should be greator or equal to 3 characters'] ,
      trim : true 
   },
   email : {
      type : String , 
      required : true ,
      unique : true ,
      match : [	
         /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/ ,
         'invalid email. please provide valid email adress'
     ],
     trim : true 
   },
   isAdmin : {
      type : Boolean ,
      default : false 
   },
   password : {
      type : String , 
      required: true 
   } ,
   avatar : {
      public_id : {
         type : String ,
         required : true 
      },
      url : {
         type : String ,
         required : true 
      }
   } ,
   passwordResetToken : { type : String } ,
   passwordResetTokenExpire : { type : Date }


} , { timestamps : true });

userSchema.pre('save' , async function(next) {
   if(!this.isModified('password')){
      return next();
   }
   this.password = await bcrypt.hash(this.password , 10);
   next();
})

userSchema.methods.comparePassword = async function(givenPassword){
   return await bcrypt.compare(givenPassword , this.password );
}

userSchema.methods.setPasswordResetToken = function() {
   const resetToken = crypto.randomBytes(20).toString('hex');
   this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
   this.passwordResetTokenExpire = new Date(Date.now() + 10 * 60 * 1000);
   return resetToken;
}

const User = mongoose.model("User" , userSchema);
module.exports = User;