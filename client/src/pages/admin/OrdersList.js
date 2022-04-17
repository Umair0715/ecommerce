import React, { useEffect } from 'react'
import { clearErrors, deleteOrder, getAllOrders } from '../../redux/actions/orderActions'
import { useDispatch , useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import DashboardMenu from './../../components/dashboard/DashboardMenu';
import Loader from './../../components/loader/Loader';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useNavigate } from 'react-router-dom';
import { DELETE_ORDER_RESET } from '../../redux/constants/orderConstants';

const OrdersList = () => {
   const navigate = useNavigate();
   const alert = useAlert();
   const dispatch = useDispatch();
   const { loading , error , orders } = useSelector(state => state.allOrders);
   const { loading : delLoading , error : delError , isDeleted} = useSelector(state => state.delUpdateOrder);

   useEffect(() => {
      if(error){
         alert.error(error);
         dispatch(clearErrors());
      }
      if(delError){
         alert.error(delError);
         dispatch(clearErrors())
      }
      if(isDeleted){
         alert.success('Order Deleted Successfully.')
         dispatch({ type : DELETE_ORDER_RESET });
         dispatch(getAllOrders())
      }
      
      dispatch(getAllOrders())
   }, [dispatch , error , alert , delError , isDeleted , navigate ])


   const deleteOrderHandler = id => {
      dispatch(deleteOrder(id))
   }

   return (
      <div className='admin__products'>
         <DashboardMenu />
         <div className='admin__products__container'>
            <h3 className='font-xl font-500 text-dark text-center'>All Orders</h3>
            {delLoading && <Loader /> }
            <div className='admin__products__table'>
            {
               loading ? <Loader />
               :
               orders && orders.length > 0 ? 
               <div className=''>
                 <table>
                    <thead>
                        <tr>
                           <th scope='col'>Order ID</th>
                           <th scope='col'>Status</th>
                           <th scope='col'>Item Qty</th>
                           <th scope='col'>Amount</th>
                           <th scope='col'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                           orders && orders.map(order => (
                              <tr key={order._id}>
                                 <td data-label='Order ID'>{order._id}</td>
                                 <td data-label='Status'
                                 >{order.orderStatus}</td>
                                 <td data-label='Item Qty'>{order && order.orderItems.length}</td>
                                 <td data-label='Amount'>PKR: {order.totalPrice}</td>
                                 <td data-label='Action' className='text-main pointer  '>
                                       <EditIcon 
                                       style={{color: 'green' , marginRight: '1rem'}} 
                                       onClick={() => navigate(`/admin/order/update/${order._id}`)}
                                       />

                                       <DeleteIcon 
                                       title='Delete Product' 
                                       onClick={() => deleteOrderHandler(order._id)}
                                       />
                                 </td>
                              </tr>
                           ))
                        }
                    </tbody>
                 </table>
              </div>
              :   
              <div className='w-100 min-h-100 flex items-center justify-between'>
                 <h3 className='text-error'>No Orders Found.</h3>
              </div>
            }
            </div>
         </div>
      </div>
   )
}

export default OrdersList;