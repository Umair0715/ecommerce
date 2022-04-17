import {
   GET_PRODUCTS_FAIL ,
   GET_PRODUCTS_REQUEST , 
   GET_PRODUCTS_SUCCESS ,
   CLEAR_ERRORS ,
   PRODUCT_DETAILS_REQUEST ,
   PRODUCT_DETAILS_SUCCESS ,
   PRODUCT_DETAILS_FAIL,
   GET_ADMIN_PRODUCTS_REQUEST,
   GET_ADMIN_PRODUCTS_SUCCESS,
   GET_ADMIN_PRODUCTS_FAIL ,
   CREATE_PRODUCT_REQUEST,
   CREATE_PRODUCT_SUCCESS,
   CREATE_PRODUCT_FAIL,
   PRODUCT_IMAGES_REQUEST,
   PRODUCT_IMAGES_SUCCESS,
   PRODUCT_IMAGES_FAIL ,
   DELETE_PRODUCT_REQUEST,
   DELETE_PRODUCT_SUCCESS,
   DELETE_PRODUCT_FAIL,
   UPDATE_PRODUCT_REQUEST,
   UPDATE_PRODUCT_SUCCESS,
   UPDATE_PRODUCT_FAIL,
} 
from './../constants/productConstants';
import axios from 'axios';

export const getProducts = ( keyword = '' , pageNumber=1 , price=[0 , 500000] , rating=0 , category='' ) => async dispatch => {
   dispatch({ type : GET_PRODUCTS_REQUEST })
   try{
      let url = `/api/v1/product/all?keyword=${keyword}&page=${pageNumber}&price[gte]=${price[0]}&price[lte]=${price[1]}`
      if(rating){
         url = `/api/v1/product/all?keyword=${keyword}&page=${pageNumber}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratingsAvg[gte]=${rating}`
      }
      if(category !== ''){
         url = `/api/v1/product/all?keyword=${keyword}&page=${pageNumber}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratingsAvg[gte]=${rating}&category=${category}`
      }
      const { data : { products , pages , page } } = await axios.get(url);
      dispatch({ type : GET_PRODUCTS_SUCCESS , payload : {products , pages , page} })

   }catch(err){
      dispatch({ type : GET_PRODUCTS_FAIL , payload : err.response && err.response.data.message ? err.response.data.message : err.message || 'something went very wrong.'})
   }
}

// FOR ADMIN PAGINATION
export const getAdminProducts = (pageNumber=1 ) => async dispatch => {
   dispatch({ type : GET_PRODUCTS_REQUEST })
   try{
      let url = `/api/v1/product/all?page=${pageNumber}`
      const { data : { products , pages , page } } = await axios.get(url);
      dispatch({ type : GET_PRODUCTS_SUCCESS , payload : {products , pages , page} })

   }catch(err){
      dispatch({ type : GET_PRODUCTS_FAIL , payload : err.response && err.response.data.message ? err.response.data.message : err.message || 'something went very wrong.'})
   }
}

// ALL PRODUCTS FOR ADMIN DASHBOARD CALCULATION
export const getAllAdminProducts = ( ) => async dispatch => {
   dispatch({ type : GET_ADMIN_PRODUCTS_REQUEST })
   try{
      let url = `/api/v1/product/admin/all`
      const { data : { products } } = await axios.get(url);
      dispatch({ type : GET_ADMIN_PRODUCTS_SUCCESS , payload : products })

   }catch(err){
      dispatch({ type : GET_ADMIN_PRODUCTS_FAIL , payload : err.response && err.response.data.message ? err.response.data.message : err.message || 'something went very wrong.'})
   }
}

export const productDetails = id => async dispatch => {
   dispatch({ type : PRODUCT_DETAILS_REQUEST })
   try{
      const { data : { product } } = await axios.get(`/api/v1/product/${id}`);
      dispatch({ type : PRODUCT_DETAILS_SUCCESS , payload : product })

   }catch(err){
      dispatch({ type : PRODUCT_DETAILS_FAIL , payload : err.response && err.response.data.message ? err.response.data.message : err.message || 'something went very wrong.'})
   }
}

// CREATE PRODUCT 
export const createProduct = data => async dispatch => {
   dispatch({ type : CREATE_PRODUCT_REQUEST })
   try{
      const { data : { product } } = await axios.post(`/api/v1/product/new` , data);
      dispatch({ type : CREATE_PRODUCT_SUCCESS , payload : product });
   }catch(err){
      dispatch({ type : CREATE_PRODUCT_FAIL , payload : err.response && err.response.data.message ? err.response.data.message : err.message || 'something went very wrong.'})
   }
}

// ADD PRODUCT IMAGES
export const addProductImages = images => async (dispatch , getState)=> {
   dispatch({ type : PRODUCT_IMAGES_REQUEST })
   if(!getState().newProduct){
      dispatch({ type : PRODUCT_IMAGES_FAIL , payload : 'something went wrong.'})
   }
   const { id } = getState().newProduct.product;
   try{
      const { data : { product } } = await axios.post(`/api/v1/product/new/images/${id}` , images);
      dispatch({ type : PRODUCT_IMAGES_SUCCESS , payload : product });
   }catch(err){
      dispatch({ type : PRODUCT_IMAGES_FAIL , payload : err.response && err.response.data.message ? err.response.data.message : err.message || 'something went very wrong.'})
   }
}

// ADD PRODUCT IMAGES
export const addUpdateProductImages = (id,images) => async (dispatch)=> {
   dispatch({ type : PRODUCT_IMAGES_REQUEST })
   try{
      const { data : { product } } = await axios.post(`/api/v1/product/new/images/${id}` , images);
      dispatch({ type : PRODUCT_IMAGES_SUCCESS , payload : product });
   }catch(err){
      dispatch({ type : PRODUCT_IMAGES_FAIL , payload : err.response && err.response.data.message ? err.response.data.message : err.message || 'something went very wrong.'})
   }
}

// DELTE PRODUCT
export const deleteProduct = id => async dispatch => {
   dispatch({ type : DELETE_PRODUCT_REQUEST })
   try{
      await axios.delete(`/api/v1/product/${id}`);
      dispatch({ type : DELETE_PRODUCT_SUCCESS  })

   }catch(err){
      dispatch({ type : DELETE_PRODUCT_FAIL , payload : err.response && err.response.data.message ? err.response.data.message : err.message || 'something went very wrong.'})
   }
}

// UPDATE PRODUCT
export const updateProduct = ( id , data ) => async dispatch => {
   dispatch({ type : UPDATE_PRODUCT_REQUEST })
   try{
      await axios.put(`/api/v1/product/${id}` , data);
      dispatch({ type : UPDATE_PRODUCT_SUCCESS  })

   }catch(err){
      dispatch({ type : UPDATE_PRODUCT_FAIL , payload : err.response && err.response.data.message ? err.response.data.message : err.message || 'something went very wrong.'})
   }
}


export const clearErrors = () => async dispatch => {
   dispatch({ type : CLEAR_ERRORS })
}