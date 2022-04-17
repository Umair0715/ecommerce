import {
   ORDER_CREATE_FAIL ,
   ORDER_CREATE_SUCCESS ,
   ORDER_CREATE_REQUEST ,
   CLEAR_ERRORS ,
   MY_ORDERS_FAIL ,
   MY_ORDERS_REQUEST ,
   MY_ORDERS_SUCCESS ,
   ORDER_DETAILS_FAIL ,
   ORDER_DETAILS_REQUEST ,
   ORDER_DETAILS_SUCCESS ,
   ALL_ORDERS_FAIL ,
   ALL_ORDERS_SUCCESS ,
   ALL_ORDERS_REQUEST ,
   UPDATE_ORDER_REQUEST ,
   UPDATE_ORDER_SUCCESS,
   UPDATE_ORDER_FAIL,
   DELETE_ORDER_REQUEST ,
   DELETE_ORDER_SUCCESS,
   DELETE_ORDER_FAIL,
}
from './../constants/orderConstants';
import { RESET_CART_ITEMS } from './../constants/cartConstants';
import axios from 'axios';

export const createOrder = data => async dispatch => {
   dispatch({ type : ORDER_CREATE_REQUEST })
   try{
      const config = {
         headers : {
            'Content-Type' : 'application/json'
         }
      }
      const { data : { order } } = await axios.post('/api/v1/order/new' , data , config);
      dispatch({ type : ORDER_CREATE_SUCCESS , payload : order})
      localStorage.removeItem('cartItems');
      sessionStorage.removeItem('orderInfo');
      dispatch({ type : RESET_CART_ITEMS });
   }catch(err){
      dispatch({ type : ORDER_CREATE_FAIL , payload : err.response && err.response.data.message ? err.response.data.message : err.message || 'something went very wrong'})
   }
}


// LOGGED IN USER ORDERS
export const getMyOrders = () => async dispatch => {
   dispatch({ type : MY_ORDERS_REQUEST });
   try{
      const config = {
         headers : {
            'Content-Type' : 'application/json'
         }
      }
      const { data : { orders } } = await axios.get('/api/v1/order/myOrders' , config);

      dispatch({ type : MY_ORDERS_SUCCESS , payload : orders })

   }catch(err){
      dispatch({ type : MY_ORDERS_FAIL , payload : err.response && err.response.data.message ? err.response.data.message : err.message || 'Something went veryn wrong.'})
   }
}


// ORDER DETAILS USER
export const getOrderDetails = id => async dispatch => {
   dispatch( { type : ORDER_DETAILS_REQUEST })
   try{
      const config = {
         headers : {
            'Content-Type' : 'application/json'
         }
      }
      const { data : { order }} = await axios.get(`/api/v1/order/${id}` , config)
      dispatch({ type : ORDER_DETAILS_SUCCESS , payload : order })

   }catch(err){
      dispatch({ type : ORDER_DETAILS_FAIL , payload : err.response && err.response.data.message ? err.response.data.message : err.message || 'something went very wrong.'})
   }
}

// ALL ORDERS (ADMIN) 
export const getAllOrders = () => async dispatch => {
   dispatch({ type : ALL_ORDERS_REQUEST });
   try{
      const config = {
         headers : {
            'Content-Type' : 'application/json'
         }
      }
      const { data : { orders } } = await axios.get('/api/v1/order/all' , config);

      dispatch({ type : ALL_ORDERS_SUCCESS , payload : orders })

   }catch(err){
      dispatch({ type : ALL_ORDERS_FAIL , payload : err.response && err.response.data.message ? err.response.data.message : err.message || 'Something went veryn wrong.'})
   }
}

// UPDATE ORDER STATUS 
export const updateOrder = (id , data ) => async dispatch => {
   dispatch( { type : UPDATE_ORDER_REQUEST })
   try{
      const config = {
         headers : {
            'Content-Type' : 'application/json'
         }
      }
      await axios.put(`/api/v1/order/${id}` , data , config)
      dispatch({ type : UPDATE_ORDER_SUCCESS })

   }catch(err){
      dispatch({ type : UPDATE_ORDER_FAIL , payload : err.response && err.response.data.message ? err.response.data.message : err.message || 'something went very wrong.'})
   }
}


// UPDATE ORDER STATUS 
export const deleteOrder = id  => async dispatch => {
   dispatch( { type : DELETE_ORDER_REQUEST })
   try{
      const config = {
         headers : {
            'Content-Type' : 'application/json'
         }
      }
      await axios.delete(`/api/v1/order/${id}` , config)
      dispatch({ type : DELETE_ORDER_SUCCESS })

   }catch(err){
      dispatch({ type : DELETE_ORDER_FAIL , payload : err.response && err.response.data.message ? err.response.data.message : err.message || 'something went very wrong.'})
   }
}


export const clearErrors = () => async dispatch => {
   dispatch({ type : CLEAR_ERRORS })
}