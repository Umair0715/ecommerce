import {
   ADD_TO_CART ,
   REMOVE_FROM_CART ,
   SAVE_SHIPPING_INFO ,
   RESET_CART_ITEMS
}
from './../constants/cartConstants';


export const cartReducer = (state={ cartItems : [] , shippingInfo : {}} , action ) => {
   switch (action.type) {
      case ADD_TO_CART : 
         const item = action.payload;
         const itemExist = state.cartItems.find(x => x.product === item.product);
         if(itemExist){
            return {
               ...state ,
               cartItems : state.cartItems.map(x => x.product === itemExist.product ? item : x)
            }
         }else{
            return {
               ...state ,
               cartItems : [...state.cartItems , item ]
            }
         }
      case REMOVE_FROM_CART:
         return {
            ...state ,
            cartItems : state.cartItems.filter(x => x.product !== action.payload)
         }
      case SAVE_SHIPPING_INFO:
         return {
            ...state ,
            shippingInfo : action.payload 
         }
      case RESET_CART_ITEMS:
         return {
            ...state ,
            cartItems : [] ,
            
         }
      default: return state ;
   }

}