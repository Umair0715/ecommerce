import React, { useEffect } from 'react'
import { useDispatch , useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { getMyOrders , clearErrors } from './../redux/actions/orderActions';
import Loader from './../components/loader/Loader';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const alert = useAlert();
   const { loading , error , orders } = useSelector(state => state.myOrders)

   useEffect(() => {
      if(error){
         alert.error(error);
         dispatch(clearErrors())
      }
      dispatch(getMyOrders())
   }, [dispatch , error , alert ])


   return (
      loading ? <Loader />
      : orders && orders.length > 0 ? 
       <div className='myOrders__container'>
         <table>
            <thead>
               <tr>
                  <th scope='col'>Order ID</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>Items Quantity</th>
                  <th scope='col'>Amount</th>
                  <th scope='col'>Action</th>
               </tr>
            </thead>
            <tbody>
               {
                  orders.map(order => (
                     <tr key={order._id}>
                        <td data-label='Order ID'>{order._id}</td>
                        <td data-label='Status'
                        className={`${order.orderStatus === 'Delivered' ? 'text-success' : 'text-error'}`}
                        >{order.orderStatus}</td>
                        <td data-label='Items Quantity'>{order.orderItems.length}</td>
                        <td data-label='Amount'>PKR: {order.totalPrice}</td>
                        <td data-label='Action' className='text-main pointer' onClick={() => navigate(`/order/${order._id}`)}>View Details</td>
                     </tr>
                  ))
               }
            </tbody>
         </table>
      </div>
      : <div className='width-100 min-h-100 flex items-center justify-center'>
         <h3 className='text-error font-3xl'>No Order Found.</h3>
      </div>
   )
}

export default Orders