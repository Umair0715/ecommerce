import {
   ADD_TO_CART, 
   REMOVE_FROM_CART ,
   SAVE_SHIPPING_INFO ,
} 
from './../constants/cartConstants';
import axios from 'axios';


export const addToCart = (id , qty) => async ( dispatch, getState) => {
   try{
      const { data : { product }} = await axios.get(`/api/v1/product/${id}`);
      dispatch({ type : ADD_TO_CART , payload : {
         product : product._id ,
         price : product.price,
         images : product.images,
         stock : product.stock ,
         name : product.name ,
         qty 
      }});
      localStorage.setItem('cartItems' , JSON.stringify(getState().cart.cartItems))

   }catch(err){
      console.log('From add to cart action' , err);
   }
}

// REMOVE CART ITEM
export const removeFromCart = id  => async ( dispatch, getState) => {
   try{
      dispatch({ type : REMOVE_FROM_CART , payload : id})
      localStorage.setItem('cartItems' , JSON.stringify(getState().cart.cartItems))
   }catch(err){
      console.log('From Remove From cart action' , err);
   }
}

// SAVE SHIPPING INFO
export const saveShippingInfo = data => async ( dispatch , getState ) =>  {
   dispatch({ type : SAVE_SHIPPING_INFO , payload : data })
   localStorage.setItem('shippingInfo' , JSON.stringify(getState().cart.shippingInfo))
}