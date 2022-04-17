const dotenv = require('dotenv');
dotenv.config();
const Product = require('./models/productModel');
// const mongoose = require('mongoose');
const connectDB = require('./utils/db');
const products = require('./products');

connectDB();

const addProducts = async () => {
   try{
      await Product.deleteMany();
      await Product.insertMany(products);
      console.log('products added successfully.')
   }catch(err){
      console.log(err);
   }
}

addProducts();