import React, { useState } from 'react'
import ProductDetail from '../components/productDetails/ProductDetail'
import Reviews from '../components/productDetails/Reviews'
import { useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { clearErrors, productDetails } from '../redux/actions/productActions';
import { useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';
import Loader from '../components/loader/Loader';
import CreateReview from '../components/productDetails/CreateReview';


const ProductDetails = () => {
   const [reviewForm , setReviewForm ] = useState(false);
   const { id } = useParams();
   const dispatch = useDispatch();
   const alert = useAlert();
   const { product , error , loading } = useSelector(state => state.product);

   useEffect(() => {
      if(error){
         alert.error(error);
         dispatch(clearErrors());
      }
      dispatch(productDetails(id))
   }, [dispatch , id , error , alert]);

   return (
      loading ? <Loader />
      : product && 
      <div className='product__Details__wrapper'>
         <ProductDetail product={product} reviewForm={reviewForm} setReviewForm={setReviewForm}/>
         <CreateReview product={product} reviewForm={reviewForm} setReviewForm={setReviewForm}/>
         <Reviews product={product}/>
      </div>
   )
}

export default ProductDetails