import './ProductDetail.css';
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import Rating from './../Rating';
import 'swiper/swiper.min.css'
import "swiper/swiper-bundle.min.css";
import { useState } from 'react';
import { Autoplay, Pagination, Navigation } from "swiper";
import { useDispatch } from 'react-redux';
import { addToCart } from './../../redux/actions/cartActions';
import { useAlert } from 'react-alert';

const ProductDetail = ({ product , reviewForm , setReviewForm }) => {
   const [qty , setQty ] = useState(1);
   const dispatch = useDispatch();
   const alert = useAlert();

   const increaseQty = () => {
      if(qty < product.stock){
         setQty(qty + 1);
      }else{
         alert.info(`Product available stock is ${product.stock}.`)
      }
   }
   const decreaseQty = () => {
      if(qty > 1){
         setQty(qty - 1);
      }
   }

   const addToCartHandler = () => {
      dispatch(addToCart(product._id , qty));
      alert.success('Item Added to cart');
   }


   return (
      product && 
      <div className='product__detail flex items-center justify-between py-30'>
         <div className='details__left flex-1'>
            <Swiper
               spaceBetween={30}
               centeredSlides={true}
               loop={true}
               autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
               }}
               pagination={{
                  clickable: true,
               }}
               // navigation={true}
               modules={[Autoplay, Pagination, Navigation]}
               className="mySwiper"
            >
                  {
                     product &&  product.images && product.images.length > 0 ?
                     product.images.map(image => (
                        <SwiperSlide key={image.public_id}>
                           <img src={image.url} alt={image.public_id} />
                        </SwiperSlide>
                     ))
                     : ''
                  }
            </Swiper>
         </div>
         <div className='details__right flex-1 text-dark'>
            <div className='details__right-1 mb-20'>
               <h3 className='font-lg font-500'>Product #{product._id}</h3>
            </div>
            <div className='line'></div>
            <div className='details__right-2 my-10 flex items-center'>
               <Rating rating={product.ratingsAvg} />
               <span className='font-sm text-muted ml-20 mt-5'>({product.numOfReviews} Reviews)</span>
            </div>
            <div className='line'></div>
            <div className='details__right-3 py-20'>
               <h3 className='font-lg font-500'>PKR {product.price}</h3>
               {
                  product.stock > 0 && 
                  <div className='mt-20 flex items-center '>
                     <div className='flex items-center font-base'>
                        <button className='qty__controller'
                        onClick={decreaseQty} >-</button>
                        <span className='qty'>{qty}</span>
                        <button className='qty__controller'
                        onClick={increaseQty}>+</button>
                     </div>
                     <div className='ml-20'>
                        <button className='btn btn-primary'
                        onClick={addToCartHandler}>Add To Cart</button>
                     </div>
                  </div>
               }
            </div>
            <div className='line'></div>
            <div className='details__right-4 py-10'>
               <span className='text-muted font-base'>Status: 
                  <strong 
                  style={{color : `${product.stock > 0 ? 'green' : 'red'}`}}
                  >
                  {product.stock > 0 ? 'InStock' : 'OutOfStock'}
                  </strong>
               </span>
            </div>
            <div className='line'></div>
            <div className='details__right-5 mt-10 '>
               <h3 className='font-lg font-500 text-dark'>Description</h3>
               <p className='font-sm mt-10 text-muted'>{product.description}</p>
            </div>
            <div className='details__right-6 mt-20'>
               <button className='btn btn-primary' onClick={() => setReviewForm(!reviewForm)}>Submit Review</button>
            </div>
            

         </div>
      </div>
   )
}

export default ProductDetail