const mongoose = require('mongoose');
const Product = require('./productModel');

const reviewSchema = new mongoose.Schema({
   user : {
      type : mongoose.Schema.ObjectId,
      ref : 'User',
      required : true 
   },
   product : {
      type : mongoose.Schema.ObjectId,
      ref : "Product",
      required : true 
   },
   rating : {
      type : Number ,
      required : true 
   },
   review : {
      type : String , 
      required : true 
   }
} , { 
   timestamps : true , 
   toJSON : { virtuals : true } ,
   toObject : { virtuals : true } 
});

reviewSchema.pre(/^find/ , function(next) {
   this.populate({
      path : 'user' ,
      select : 'name image'
   })
   next();
})


// aggregation pipeline
reviewSchema.statics.calcAvgRating = async function(productId) {
   const stats = await this.aggregate([
      {
         $match : { product : productId}
      },
      {
         $group : { 
            _id : '$product',
            numOfRatings : { $sum : 1} ,
            avgRating : { $avg : '$rating'}
         }
      }
   ]);

   if(stats.length > 0){
      await Product.findByIdAndUpdate(productId , {
         ratingsAvg : stats[0].avgRating,
         numOfReviews : stats[0].numOfRatings
      } , { new : true })
   }else{
      await Product.findByIdAndUpdate(productId , {
         ratingsAvg : 0 ,
         numOfReviews : 0
      } , { new : true })
   }
}

// POST SAVE MIDDLEWATE
reviewSchema.post('save' , async function() {
   await this.constructor.calcAvgRating(this.product);
});

reviewSchema.pre(/^findOneAnd/ , async function(next){
   this.doc = await this.findOne().clone();
   next();
});

reviewSchema.post(/^findOneAnd/ , async function() {
   await this.doc.constructor.calcAvgRating(this.doc.product);
})

const Review = mongoose.model('Review' , reviewSchema);
module.exports = Review;