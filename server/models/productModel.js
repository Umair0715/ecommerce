const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
   name : {
      type : String , 
      required : [true , 'product name is required'] ,
      maxlength : [30 , 'product name should not exceed 30 characters'] ,
      trim : true 
   },
   description : {
      type : String , 
      required : [true , 'product Description is required'] ,
      maxlength : [2000 , 'product description should not exceed 2000 characters'] ,
      trim : true 
   },
   price : {
      type : Number , 
      required : [true , 'product price is required'] ,
   },
   category : {
      type : String , 
      required : [true , 'product category is required'] ,
      trim : true 
   },
   stock : {
      type : Number , 
      required : [true , 'product stock is required'] ,
   },
   numOfReviews : {
      type : Number , 
      default : 0
   },
   ratingsAvg : {
      type : Number , 
      default : 0 
   } ,
   user : {
      type : mongoose.Schema.ObjectId ,
      ref : "User" ,
      required : true 
   } ,
   images: [
      {
         public_id: {
            type: String,
            required: true,
         },
         url: {
            type: String,
            required: true,
         },
      },
   ],
} , { 
   timestamps : true,
   toJSON : { virtuals : true } ,
   toObject : { virtuals : true } 
})

// PRE FIND MIDDLEWARE
productSchema.pre(/^find/ , function(next){
   this.populate({
      path : 'reviews',
      select : '-createdAt -updatedAt -__v'
   })
   next();
});

// VIRTUAL POPULATE 
productSchema.virtual('reviews' , {
   ref : 'Review' ,
   foreignField : 'product' ,
   localField : '_id'
})

const Product = mongoose.model('Product' , productSchema);
module.exports = Product ;