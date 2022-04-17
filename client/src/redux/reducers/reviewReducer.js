import {
   CREATE_REVIEW_FAIL ,
   CREATE_REVIEW_REQUEST ,
   CREATE_REVIEW_SUCCESS ,
   CLEAR_ERRORS ,
   CREATE_REVIEW_RESET,
   PRODUCT_REVIEWS_REQUEST,
   PRODUCT_REVIEWS_SUCCESS,
   PRODUCT_REVIEWS_FAIL,
   DELETE_REVIEW_REQUEST,
   DELETE_REVIEW_SUCCESS,
   DELETE_REVIEW_FAIL,
   DELETE_REVIEW_RESET
} 
from './../constants/reviewConstants';

export const createReviewReducer = (state ={success : false } , action) => {
   switch (action.type) {
      case CREATE_REVIEW_REQUEST:
         return {
            loading : true 
         }
      case CREATE_REVIEW_SUCCESS: 
         return {
            loading : false ,
            success : true 
         }
      case CREATE_REVIEW_FAIL: 
         return{
            loading : false ,
            error : action.payload 
         }
      case CREATE_REVIEW_RESET: 
         return {
            ...state,
            success : false 
         }
      case CLEAR_ERRORS: 
         return {
            ...state ,
            error : null 
         }
      default : return state 
   }
}


export const getProductReviewsReducer = (state ={reviews : [] } , action) => {
   switch (action.type) {
      case PRODUCT_REVIEWS_REQUEST:
         return {
            loading : true 
         }
      case PRODUCT_REVIEWS_SUCCESS: 
         return {
            loading : false ,
            reviews : action.payload 
         }
      case PRODUCT_REVIEWS_FAIL: 
         return{
            loading : false ,
            error : action.payload 
         }
      case CLEAR_ERRORS: 
         return {
            ...state ,
            error : null 
         }
      default : return state 
   }
}

export const deleteReviewReducer = (state ={isDeleted : false } , action) => {
   switch (action.type) {
      case DELETE_REVIEW_REQUEST:
         return {
            loading : true 
         }
      case DELETE_REVIEW_SUCCESS: 
         return {
            loading : false ,
            isDeleted : true 
         }
      case DELETE_REVIEW_FAIL: 
         return{
            loading : false ,
            error : action.payload 
         }
      case DELETE_REVIEW_RESET: 
         return {
            ...state,
            isDeleted : false 
         }
      case CLEAR_ERRORS: 
         return {
            ...state ,
            error : null 
         }
      default : return state 
   }
}