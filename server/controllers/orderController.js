const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Order = require('./../models/orderModel');
const Product = require('./../models/productModel');

//CREATE ORDER :: POST    /api/v1/order/new    (Private)
exports.createOrder = catchAsync(async (req , res , next) => {
   const { orderItems , shippingInfo , itemsPrice , taxPrice , shippingPrice , totalPrice , paymentInfo } = req.body;
  
   const newOrder = await Order.create({
      user : req.user._id ,
      orderItems ,
      shippingInfo ,
      itemsPrice , 
      taxPrice , 
      totalPrice ,
      shippingPrice ,
      paymentInfo
   });

   return res.status(200).json({
      status : "success" ,
      order : newOrder
   })

});

// GET SINGLE ORDER :: GET    /api/v1/order/:id    (Private)
exports.getSingleOrder = catchAsync(async (req , res , next) => {
   const order = await Order.findById(req.params.id);
   if(!order){
      return next(new AppError('Order not found.' , 404))
   }
   return res.status(200).json({
      status : "success" ,
      order 
   })

});


// LOGGED IN USER ORDERS :: GET    /api/v1/order/myOrders    (Private)
exports.getMyOrders = catchAsync(async (req , res , next) => {
   const orders = await Order.find({ user : req.user._id });
   if(!orders){
      return next(new AppError('No order found.' , 404))
   }
   return res.status(200).json({
      status : "success" ,
      orders
   })

})

// DELETE ORDER :: GET    /api/v1/order/:id    (Admin)
exports.deleteOrder = catchAsync(async (req , res , next) => {
   const order = await Order.findById(req.params.id);
   if(!order){
      return next(new AppError('Order not found.' , 404))
   }
   await order.remove();
   return res.status(200).json({
      status : "success" ,
      order
   })
})

// GET ALL ORDERS :: GET    /api/v1/order/all    (Admin)
exports.getAllOrders = catchAsync(async (req , res , next) => {
   const orders = await Order.find();
   if(!orders){
      return next(new AppError('No order found.' , 404))
   }
   let totalAmount = 0 ;
   orders.map(order => totalAmount += order.totalPrice )
   return res.status(200).json({
      status : "success" ,
      totalAmount ,
      orders ,
   })
});


// UPDATE ORDER STATUS :: PUT    /api/v1/order/:id    (Admin)
exports.updateOrder = catchAsync(async (req , res , next) => {
   const order = await Order.findById(req.params.id);
   if(!order){
      return next(new AppError('No order found.' , 404))
   }
   if(order.orderStatus === 'Delivered'){
      return next(new AppError('Order is Already delivered.' , 400))
   }
   if(req.body.status === 'Shipped'){
      order.orderItems.map(async order => (
         await updateStock(order.product , order.qty)
      ));
   }

   order.orderStatus = req.body.status;

   if (req.body.status === "Delivered") {
     order.deliveredAt = Date.now();
   }
   await order.save({ vaidateBeforeSave : false })
   return res.status(200).json({
      status : "success" ,
      order 
   })
   
});

const updateStock = async (id , qty ) => {
   const product = await Product.findById(id);
   product.stock -= qty ;
   await product.save();
}