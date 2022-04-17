const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const errorHandler = require('./middlewares/errorHandler');
const connectDB = require('./utils/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const cloudinary = require('cloudinary');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const path = require('path');


// DATABSE
connectDB();

cloudinary.config({
   cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
   api_key : process.env.CLOUDINARY_API_KEY ,
   api_secret : process.env.CLOUDINARY_API_SECRET
})

// ASSETS
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// ROUTES
app.use('/api/v1' , require('./routes/paymentRoutes'));
app.use('/api/v1/user' , require('./routes/userRoutes'));
app.use('/api/v1/product' , require('./routes/productRoutes'));
app.use('/api/v1/review' , require('./routes/reviewRoutes'));
app.use('/api/v1/order' , require('./routes/orderRoutes'));

app.use(express.static(path.join(__dirname , '../client/build')));

app.get('*' , (req ,res) => {
  res.sendFile(path.resolve(__dirname , '../client/build/index.html'));
})

// GLOBAL ERROR HANDLER
app.use(errorHandler);

// SERVER
const PORT = process.env.PORT || 4400;
app.listen(PORT , () => console.log(`server is listening on port ${PORT}`));
