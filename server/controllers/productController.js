const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Product = require('./../models/productModel');
const ApiFeatures = require('../utils/apiFeatures');
const cloudinary = require('cloudinary');

//CREATE PRODUCT :: POST    /api/v1/product/new    (Admin)
exports.createProduct = catchAsync( async(req ,res , next) => {
   const { name , description , price , category , stock } = req.body;

   if(!name || !description || !price || !category || !stock){
      return next(new AppError('Missing required credentials'))
   }

   const newProduct = await Product.create({
      name , 
      description ,
      price ,
      stock ,
      category ,
      user : req.user._id 
   })

   res.status(201).json({
      status : "success" ,
      product : newProduct
   })

});

//ADD PRODUCT IMAGES :: POST    /api/v1/product/new/images    (Admin)
exports.addProductImages = catchAsync( async (req , res , next) => {
   let images = req.files.images;
   let imagesLinks = [];

   for(let i = 0 ; i < images.length ; i++){
      let result = await cloudinary.uploader.upload( images[i].tempFilePath ,{
         folder : 'products' ,
         public_id: req.params.id,
      })
      imagesLinks.push({
         public_id : result.public_id ,
         url : result.secure_url
      })

   }
   req.body.images = imagesLinks;
   const product = await Product.findByIdAndUpdate(req.params.id , req.body , {
      new : true ,
   })

   res.status(200).json({
      status : 'success' ,
      product  
   })
})


//GET ALL PRODUCT :: GET    /api/v1/product/all    (public)
exports.getAllProducts = catchAsync( async (req , res , next) => {
   const perPage = 8;
   const page = Number(req.query.page) || 1;
   const apiFeatures = new ApiFeatures( Product.find() , req.query )
   .search()
   .filter()

   let products = await apiFeatures.query.clone();
   
   const docCount = products.length;

   apiFeatures.paginate(perPage)
   products = await apiFeatures.query;
   if(!products || products.length === 0){
      return next( new AppError('no product found.' , 404))
   }
   const pages = Math.ceil(docCount / perPage);
   res.status(200).json({
      status : "success" ,
      results : products.length ,
      products,
      pages ,
      page
   })
});

// GET ALL PRODUCT :: GET    /api/v1/product/admin/all   (admin)
exports.getAllAdminProducts = catchAsync( async (req , res , next) => {
   const products = await Product.find();
   if(!products || products.length === 0 ){
      return next( new AppError('No Product found.'))
   }
   res.status(200).json({
      status : "success" ,
      products
   })
})
 

//GET SIINGLE PRODUCT :: GET    /api/v1/product/:id    (public)
exports.getSingleProduct = catchAsync( async (req , res , next) => {
   const product = await Product.findById(req.params.id);
   if(!product){
      return next( new AppError('product not found.' , 404))
   }
   res.status(200).json({
      status : "success" ,
      product
   })
});


//UPDATE PRODUCT :: PUT    /api/v1/product/:id    (Admin)
exports.updateProduct = catchAsync( async (req , res , next) => {
   const product = await Product.findById(req.params.id);
   if(!product){
      return next( new AppError('product not found.' , 404))
   }

   product.images.forEach(async image => {
      await cloudinary.uploader.destroy(image.public_id);
   })

   const updatedProduct = await Product.findByIdAndUpdate(req.params.id , req.body , {
      new : true ,
      runValidators : true 
   });

   res.status(200).json({
      status : "success" ,
      product : updatedProduct
   })
});

//DELETE PRODUCT :: DELETE    /api/v1/product/:id    (Admin)
exports.deleteProduct = catchAsync( async (req , res , next) => {
   const product = await Product.findById(req.params.id);
   if(!product){
      return next( new AppError('product not found.' , 404))
   }

   product.images.forEach(async image => {
      await cloudinary.uploader.destroy(image.public_id)
   })

   await product.remove(); 

   res.status(200).json({
      status : "success" ,
      message : 'product deleted successfully.'
   })
});