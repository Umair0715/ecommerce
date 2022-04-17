import {
   GET_PRODUCTS_FAIL ,
   GET_PRODUCTS_REQUEST , 
   GET_PRODUCTS_SUCCESS ,
   CLEAR_ERRORS ,
   PRODUCT_DETAILS_REQUEST ,
   PRODUCT_DETAILS_SUCCESS ,
   PRODUCT_DETAILS_FAIL ,
   GET_ADMIN_PRODUCTS_REQUEST,
   GET_ADMIN_PRODUCTS_SUCCESS,
   GET_ADMIN_PRODUCTS_FAIL,
   CREATE_PRODUCT_REQUEST,
   CREATE_PRODUCT_SUCCESS,
   CREATE_PRODUCT_FAIL,
   CREATE_PRODUCT_RESET,
   PRODUCT_IMAGES_REQUEST,
   PRODUCT_IMAGES_SUCCESS,
   PRODUCT_IMAGES_RESET,
   PRODUCT_IMAGES_FAIL ,
   DELETE_PRODUCT_REQUEST,
   DELETE_PRODUCT_SUCCESS,
   DELETE_PRODUCT_FAIL,
   DELETE_PRODUCT_RESET,
   UPDATE_PRODUCT_REQUEST,
   UPDATE_PRODUCT_SUCCESS,
   UPDATE_PRODUCT_FAIL,
   UPDATE_PRODUCT_RESET,
} 
from './../constants/productConstants';

export const getProductsReducer = (state={ products : [] } , action) => {
   switch (action.type) {
      case GET_PRODUCTS_REQUEST:
         return {
            loading : true ,
         }
      case GET_PRODUCTS_SUCCESS : 
         return {
            loading : false ,
            products : action.payload.products ,
            pages : action.payload.pages ,
            page : action.payload.page
         }
      case GET_PRODUCTS_FAIL: 
         return {
            loading : false ,
            error : action.payload
         }
      case CLEAR_ERRORS: 
         return {
            loading : false ,
            error : null 
         }
   
      default: return state ;
   }
}

export const getAdminProductsReducer = (state={ products : [] } , action) => {
   switch (action.type) {
      case GET_ADMIN_PRODUCTS_REQUEST:
         return {
            loading : true ,
         }
      case GET_ADMIN_PRODUCTS_SUCCESS : 
         return {
            loading : false ,
            products : action.payload ,
         }
      case GET_ADMIN_PRODUCTS_FAIL: 
         return {
            loading : false ,
            error : action.payload
         }
      case CLEAR_ERRORS: 
         return {
            ...state ,
            error : null 
         }
   
      default: return state ;
   }
}

export const productDetailsReducer = (state={ product : {} } , action) => {
   switch (action.type) {
      case PRODUCT_DETAILS_REQUEST:
         return {
            loading : true ,
         }
      case PRODUCT_DETAILS_SUCCESS: 
         return {
            loading : false ,
            product : action.payload 
         }
      case PRODUCT_DETAILS_FAIL: 
         return {
            loading : false ,
            error : action.payload
         }
      case CLEAR_ERRORS: 
         return {
            ...state ,
            error : null 
         }
   
      default: return state ;
   }
}


export const createProductReducer = (state={ product : {} } , action) => {
   switch (action.type) {
      case CREATE_PRODUCT_REQUEST:
         return {
            loading : true ,
         }
      case CREATE_PRODUCT_SUCCESS: 
         return {
            loading : false ,
            product : action.payload ,
            success : true  
         }
      case CREATE_PRODUCT_FAIL: 
         return {
            loading : false ,
            success : false ,
            error : action.payload ,
         }
      case CREATE_PRODUCT_RESET:
         return {
            ...state ,
            success : false 
         }
      case CLEAR_ERRORS: 
         return {
            ...state ,
            error : null 
         }
   
      default: return state ;
   }
}


export const addProductImagesReducer = (state={ success : false } , action) => {
   switch (action.type) {
      case PRODUCT_IMAGES_REQUEST:
         return {
            loading : true ,
         }
      case PRODUCT_IMAGES_SUCCESS: 
         return {
            loading : false ,
            product : action.payload ,
            success : true  
         }
      case PRODUCT_IMAGES_FAIL: 
         return {
            loading : false ,
            success : false ,
            error : action.payload ,
         }
      case PRODUCT_IMAGES_RESET:
         return {
            ...state ,
            success : false 
         }
      case CLEAR_ERRORS: 
         return {
            ...state ,
            error : null 
         }
   
      default: return state ;
   }
}

export const productReducer = (state={ product : {} } ,action ) => {
   switch (action.type) {
      case DELETE_PRODUCT_REQUEST:
      case UPDATE_PRODUCT_REQUEST:
         return {
            loading: true ,
         }
      case DELETE_PRODUCT_SUCCESS:
         return {
            loading: false ,
            isDeleted : true 
         } 
      case UPDATE_PRODUCT_SUCCESS: 
         return {
            loading :false ,
            isUpdated : true
         }
      case DELETE_PRODUCT_FAIL:
      case UPDATE_PRODUCT_FAIL:
         return {
            loading: false ,
            error : action.payload
         }
      case UPDATE_PRODUCT_RESET: {
         return {
            loading : false ,
            isUpdated : false ,
         }
      }  
      case DELETE_PRODUCT_RESET:
         return {
            loading : false ,
            isDeleted : false 
         } 
      case CLEAR_ERRORS : 
         return {
            ...state ,
            error : null 
         }
      default:
         return state 
   }
}