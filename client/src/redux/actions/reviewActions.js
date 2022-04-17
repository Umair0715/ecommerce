import {
   CREATE_REVIEW_FAIL ,
   CREATE_REVIEW_REQUEST ,
   CREATE_REVIEW_SUCCESS ,
   CLEAR_ERRORS ,
   PRODUCT_REVIEWS_REQUEST,
   PRODUCT_REVIEWS_SUCCESS,
   PRODUCT_REVIEWS_FAIL,
   DELETE_REVIEW_REQUEST,
   DELETE_REVIEW_SUCCESS,
   DELETE_REVIEW_FAIL,
} 
from '../constants/reviewConstants';
import axios from 'axios';

export const createReview = reviewData => async dispatch => {
   dispatch({ type : CREATE_REVIEW_REQUEST })
   try{
      const config = {
         headers : {
            'Content-Type' : 'application/json'
         }
      }
      await axios.post(`/api/v1/review/${reviewData.product}` , reviewData , config)
      dispatch({ type : CREATE_REVIEW_SUCCESS });
   }catch(err){
      dispatch({type : CREATE_REVIEW_FAIL , payload : err.response && err.response.data.message ? err.response.data.message : err.message || 'something went very wrong.'})
   }

}

// GET PRODUCT REVIEWS
export const getProductReviews = id => async dispatch => {
   dispatch({ type : PRODUCT_REVIEWS_REQUEST })
   try{
      const config = {
         headers : {
            'Content-Type' : 'application/json'
         }
      }
      const { data : { reviews } } = await axios.get(`/api/v1/review/${id}`  , config)
      dispatch({ type : PRODUCT_REVIEWS_SUCCESS , payload : reviews});
   }catch(err){
      dispatch({type : PRODUCT_REVIEWS_FAIL , payload : err.response && err.response.data.message ? err.response.data.message : err.message || 'something went very wrong.'})
   }

}

// GET PRODUCT REVIEWS
export const deleteReview = id => async dispatch => {
   dispatch({ type : DELETE_REVIEW_REQUEST })
   try{
      const config = {
         headers : {
            'Content-Type' : 'application/json'
         }
      }
      await axios.delete(`/api/v1/review/${id}`  , config)
      dispatch({ type : DELETE_REVIEW_SUCCESS });
   }catch(err){
      dispatch({type : DELETE_REVIEW_FAIL , payload : err.response && err.response.data.message ? err.response.data.message : err.message || 'something went very wrong.'})
   }

}

// CLEAR ERRORS 
export const clearErrors = () => async dispatch => {
   dispatch({ type : CLEAR_ERRORS})
}