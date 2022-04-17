const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
   user : {
      type : mongoose.Schema.ObjectId,
      ref : "User" ,
      required : true 
   } ,
   orderItems : [
      {
         product : {
            type : mongoose.Schema.ObjectId,
            ref : "Product" ,
            required : true 
         },
         qty : {
            type : Number ,
            required : true
         }
      }
   ],
   shippingInfo : {
      address : {
         type: String , 
         required : true 
      },
      city : {
         type: String , 
         required : true 
      },
      state : {
         type: String , 
         required : true 
      },
      country : {
         type: String , 
         required : true 
      },
      pinCode : {
         type: Number , 
         required : true 
      },
      phoneNo : {
         type: Number , 
         required : true 
      },
   } ,
   itemsPrice : {
      type : Number ,
      required : true ,
      default : 0
   } ,
   taxPrice : {
      type: Number , 
      required : true  ,
      default : 0
   },
   shippingPrice : {
      type: Number , 
      required : true ,
      default : 0 
   },
   totalPrice : {
      type: Number , 
      required : true  ,
      default : 0
   },
   orderStatus : {
      type : String ,
      required : true ,
      default : 'Proccessing'
   } ,
   deliveredAt : {
      type : Date ,
   } ,
   paymentInfo : {
      id : {
         type : String ,
         required : true
      } ,
      status : {
         type : String ,
         required : true
      }
   } ,
   paidAt : {
      type: Date , 
   },
} , {
   timestamps : true 
});

orderSchema.pre(/^find/ , function(next) {
   this.populate({
      path : 'orderItems',
      populate : {
         path : 'product' ,
         select : 'name images price stock'
      }
   }).populate({
      path : 'user' ,
      select : 'name email _id'
   })
   next();
})

const Order = mongoose.model("Order" , orderSchema);
module.exports = Order ;