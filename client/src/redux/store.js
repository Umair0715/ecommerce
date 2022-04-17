import { createStore , applyMiddleware , combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createProductReducer, getAdminProductsReducer, getProductsReducer, productDetailsReducer , addProductImagesReducer, productReducer } from './reducers/productReducer';
import { allUsersReducer, avatarReducer, delUpdateUserReducer, loginReducer, registerReducer, updatePasswordReducer, userDetailsReducer, userUpdateReducer } from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';
import { allOrdersReducer, delUpdateOrderReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer } from './reducers/orderReducer';
import { createReviewReducer, deleteReviewReducer, getProductReviewsReducer } from './reducers/reviewReducer';

const reducers = combineReducers({
   products : getProductsReducer ,
   product : productDetailsReducer ,
   login : loginReducer ,
   register : registerReducer ,
   avatar : avatarReducer ,
   updateUser : userUpdateReducer ,
   updatePassword : updatePasswordReducer ,
   cart : cartReducer ,
   order : newOrderReducer ,
   myOrders : myOrdersReducer ,
   orderDetails : orderDetailsReducer ,
   newReview : createReviewReducer ,
   adminProducts : getAdminProductsReducer ,
   newProduct : createProductReducer  ,
   productImages : addProductImagesReducer ,
   delUpdateProduct : productReducer ,
   allOrders : allOrdersReducer ,
   delUpdateOrder : delUpdateOrderReducer ,
   allUsers : allUsersReducer ,
   userDetails : userDetailsReducer ,
   delUpdateUser : delUpdateUserReducer ,
   reviews : getProductReviewsReducer ,
   deleteReview : deleteReviewReducer 
});

const initialState = {
   cart : {
      cartItems : localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [] ,
      shippingInfo : localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {},
   }
}

const store = createStore(reducers , initialState , composeWithDevTools(applyMiddleware(thunk)));

export default store;