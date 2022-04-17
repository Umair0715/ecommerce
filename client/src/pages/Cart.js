import React from 'react'
import { useSelector , useDispatch } from 'react-redux';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../redux/actions/cartActions';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
   const navigate = useNavigate();
   const alert = useAlert();
   const dispatch = useDispatch();
   const { cartItems } = useSelector(state => state.cart);

   const increaseQty = ( id , qty , stock ) => {
      if(qty >= stock){
         return alert.info(`Product available stock is ${stock} `)
      }
      const newQuantity = qty + 1;
      dispatch(addToCart(id , newQuantity));
   }

   const decreaseQty = ( id , qty  ) => {
      if(qty === 1){
         return;
      }
      const newQuantity = qty - 1;
      dispatch(addToCart(id , newQuantity));
   }

   const removeCartHandler = id => {
      dispatch(removeFromCart(id));
      alert.success('Item Removed successfully');
   }

   const checkoutHandler = () => {
      navigate('/login?redirect=shipping')
   }

   return (
      cartItems && cartItems.length > 0
      ?
      <div className='cart__container'>
         <div className='cart__items__container'>
            <div className='cart__header'>
               <p>Product</p>
               <p>Quantity</p>
               <p>SubTotal</p>
            </div>
            {
               cartItems.map(item => (
                  <div className='cart__item' key={item.product}>
                     <div className='cart__item__info'>
                        <img src={item.images && item.images[0].url} alt='product'></img>
                        <div className='font-sm'>
                           <p>{item.name}</p>
                           <p>PKR:{Math.round(item.price)}</p>
                           <p className='text-main pointer' 
                           onClick={() => removeCartHandler(item.product)}>Remove</p>
                        </div>
                     </div>
                     <div className='flex items-center font-base cart__qty__controllers'>
                        <button className='qty__controller'
                        onClick={() => decreaseQty(item.product , item.qty)}>-</button>
                        <span className='qty'>{item.qty}</span>
                        <button className='qty__controller'
                        onClick={() => increaseQty(item.product , item.qty , item.stock)}>+</button>
                     </div>
                     <div className='font-base text-right'>
                        <strong className='text-dark'>PKR:{Math.round(item.qty * item.price)}</strong>
                     </div>
                  </div>
               ))
            }
            
            <div className='cart__total'>
               <div>
                  <div>
                     <strong>Gross Total</strong>
                     <strong>PKR:{
                        cartItems && cartItems.reduce((acc , x) => Math.round(acc + Number(x.qty * x.price)) , 0)
                     }</strong>
                  </div>
                  <div className='checkout__btn'>
                     <button onClick={checkoutHandler}>Check Out</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
      : <div className='empty__cart'>
         <RemoveShoppingCartIcon className='empty__icon'/>
         <p>No Item In Your Cart</p>
         <Link to='/products' className='btn btn-primary'>View Products</Link>
      </div>
   )
}

export default Cart