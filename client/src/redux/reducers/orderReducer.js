import {
   ORDER_CREATE_REQUEST ,
   ORDER_CREATE_SUCCESS ,
   ORDER_CREATE_FAIL ,
   CLEAR_ERRORS ,
   MY_ORDERS_SUCCESS ,
   MY_ORDERS_REQUEST ,
   MY_ORDERS_FAIL , 
   ORDER_DETAILS_FAIL ,
   ORDER_DETAILS_REQUEST ,
   ORDER_DETAILS_SUCCESS ,
   ALL_ORDERS_FAIL ,
   ALL_ORDERS_SUCCESS ,
   ALL_ORDERS_REQUEST ,
   UPDATE_ORDER_REQUEST ,
   UPDATE_ORDER_SUCCESS,
   UPDATE_ORDER_FAIL,
   UPDATE_ORDER_RESET,
   DELETE_ORDER_REQUEST ,
   DELETE_ORDER_SUCCESS,
   DELETE_ORDER_FAIL,
   DELETE_ORDER_RESET,

} 
from './../constants/orderConstants';

export const newOrderReducer = (state = { order : {}} , action) => {
   switch (action.type) {
      case ORDER_CREATE_REQUEST:
         return {
            loading : true 
         }
      case ORDER_CREATE_SUCCESS: 
         return {
            loading : false ,
            order : action.payload 
         }
      case ORDER_CREATE_FAIL : 
         return {
            loading : false ,
            error : action.payload,
         }
      case CLEAR_ERRORS : 
         return {
            ...state ,
            error : null 
         }
      default: return state ;
   }
}

export const myOrdersReducer = (state = { orders : []} , action) => {
   switch (action.type) {
      case MY_ORDERS_REQUEST:
         return {
            loading : true ,
         }
      case MY_ORDERS_SUCCESS: 
         return {
            loading: false ,
            orders : action.payload ,
         }
      case MY_ORDERS_FAIL: 
         return {
            loading : false ,
            error : action.payload ,
         }
      case CLEAR_ERRORS: 
         return {
            ...state ,
            error : null 
         }
   
      default: return state 
   }
}

export const orderDetailsReducer = ( state = {orderDetails : {}} , action) => {
   switch (action.type) {
      case ORDER_DETAILS_REQUEST:
         return {
            loading: true ,
         }
      case ORDER_DETAILS_SUCCESS : 
         return {
            loading : false ,
            orderDetails : action.payload
         }
      case ORDER_DETAILS_FAIL: 
         return {
            loading : false ,
            error : action.payload 
         }
      case CLEAR_ERRORS : 
         return {
            ...state ,
            error : null 
         }
      default : return state 
   }
}

export const allOrdersReducer = (state={ orders : [] } , action) => {
   switch (action.type) {
      case ALL_ORDERS_REQUEST:
         return {
            loading : true ,
         }
      case ALL_ORDERS_SUCCESS: 
         return {
            loading: false ,
            orders : action.payload ,
         }
      case ALL_ORDERS_FAIL: 
         return {
            loading : false ,
            error : action.payload ,
         }
      case CLEAR_ERRORS: 
         return {
            ...state ,
            error : null 
         }
   
      default: return state 
   }
}

export const delUpdateOrderReducer = (state={ } , action) => {
   switch (action.type) {
      case UPDATE_ORDER_REQUEST:
      case DELETE_ORDER_REQUEST:
         return {
            loading : true ,
         }
      case UPDATE_ORDER_SUCCESS: 
         return {
            loading: false ,
            isUpdated : true ,
         }
      case DELETE_ORDER_SUCCESS: 
         return {
            loading : false ,
            isDeleted : true 
         }
      case UPDATE_ORDER_FAIL: 
      case DELETE_ORDER_FAIL:
         return {
            loading : false ,
            error : action.payload ,
         }
      case UPDATE_ORDER_RESET: 
         return {
            loading : false ,
            isUpdated : false ,
         }
      case DELETE_ORDER_RESET: 
         return {
            loading : false ,
            isDeleted : false ,
         }
      case CLEAR_ERRORS: 
         return {
            ...state ,
            error : null 
         }
   
      default: return state 
   }
}