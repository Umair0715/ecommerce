import './Admin.css';
import { useParams , Link  } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { clearErrors, getOrderDetails, updateOrder } from '../../redux/actions/orderActions';
import { useAlert } from 'react-alert';
import { Typography } from "@material-ui/core";
import Loader from './../../components/loader/Loader';
import DashboardMenu from './../../components/dashboard/DashboardMenu';
import { UPDATE_ORDER_RESET } from '../../redux/constants/orderConstants';


const UpdateOrder = () => {
   const alert = useAlert();
   const { id } = useParams();
   const dispatch = useDispatch();
   const [status , setStatus ] = useState('');
   const { error , loading , orderDetails } = useSelector(state => state.orderDetails)
   const { error : updateError , loading : updateLoading , isUpdated } = useSelector(state => state.delUpdateOrder)
  
   useEffect(() => {
      if(error){
         alert.error(error);
         dispatch(clearErrors());
      }
      if(updateError){
         alert.error(updateError);
         dispatch(clearErrors());
      }
      if(isUpdated){
         alert.success('order updated successfully.');
         dispatch({ type : UPDATE_ORDER_RESET });
         dispatch(getOrderDetails(id));
      }
      dispatch(getOrderDetails(id));
   } , [ dispatch , id , error , alert , isUpdated , updateError ])

   const processOrderHandler = (e) => {
      e.preventDefault();
      dispatch(updateOrder(id , {status}))
   }

   return (
      loading ? <Loader />
      : orderDetails ?
      <>
      <div className='updateOrder__container'>
         <DashboardMenu />
         <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
               <Typography component="h1">
                  Order #{orderDetails && orderDetails._id}
               </Typography>
               <Typography>Shipping Info</Typography>
               <div className="orderDetailsContainerBox">
                  <div>
                  <p>Name:</p>
                  <span>{orderDetails.user && orderDetails.user.name}</span>
                  </div>
                  <div>
                  <p>Phone:</p>
                  <span>
                     {orderDetails.shippingInfo && orderDetails.shippingInfo.phoneNo}
                  </span>
                  </div>
                  <div>
                  <p>Address:</p>
                  <span>
                     {orderDetails.shippingInfo &&
                        `${orderDetails.shippingInfo.address}, ${orderDetails.shippingInfo.city}, ${orderDetails.shippingInfo.state}, ${orderDetails.shippingInfo.pinCode}, ${orderDetails.shippingInfo.country}`}
                  </span>
                  </div>
               </div>
               <Typography>Payment</Typography>
               <div className="orderDetailsContainerBox">
                  <div>
                  <p
                     style={{ color :  orderDetails.paymentInfo &&
                        orderDetails.paymentInfo.status === "succeeded" ? "green" : "red"}}
                  >
                     {orderDetails.paymentInfo &&
                     orderDetails.paymentInfo.status === "succeeded"
                        ? "PAID"
                        : "NOT PAID"}
                  </p>
                  </div>

                  <div>
                  <p>Amount:</p>
                  <span>{orderDetails && orderDetails.totalPrice}</span>
                  </div>
               </div>

               <Typography>Order Status</Typography>
               <div className="orderDetailsContainerBox">
                  <div>
                  <p
                     style={{ color : orderDetails && orderDetails.orderStatus === 'Delivered' ? "green" : "red"}}
                  >
                     {orderDetails && orderDetails.orderStatus}
                  </p>
                  </div>
               </div>
            </div>

            <div className="orderDetailsCartItems">
               <Typography>Order Items:</Typography>
               <div className="orderDetailsCartItemsContainer">
                  {orderDetails.orderItems && orderDetails.orderItems.length > 0 &&
                  orderDetails.orderItems.map((item) => (
                        item && item.product ? 
                        <div key={item.product._id}>
                        <img src={item.product.images[0].url} alt="Product" />
                        <Link to={`/product/${item.product._id}`}>
                           {item.product.name}
                        </Link>{" "}
                        <span>
                           {item.qty} X {item.product.price} ={" "}
                           <b>PKR: {item.product.price * item.qty}</b>
                        </span>
                        </div>
                        : ''
                  ))}
               </div>
            </div>
         </div>
         <div className='orderStatusUpdate__container'>
           
            {
               orderDetails && orderDetails.orderStatus !== "Delivered" ?
               <>
               <h3 className='font-xl font-500 text-dark text-center'>
                Process Order
               </h3>
               <form>
                  <select required onChange={(e) => setStatus(e.target.value)}>
                     <option>Choose Status</option>
                     {
                        orderDetails && orderDetails.orderStatus === 'Proccessing' && 
                        <option value='Shipped'>Shipped</option>
                     }
                     {orderDetails && orderDetails.orderStatus === 'Shipped' && 
                        <option value='Delivered'>Delivered</option>
                     }
                  </select>
                  <div>
                     <button type='submit' className='btn btn-primary '
                     onClick={processOrderHandler}>{ updateLoading ? 'Proccessing...' : 'proccess'}</button>
                  </div>
               </form>
               </>
               : 
                  <div className='w-100 min-h-100 flex items-center justify-center '>
                     <h1 className='font-xl font-500 text-success'>This Order Is Delivered</h1>
                  </div>

            }
         </div>
      </div>
    </>
      : ''
   )
}

export default UpdateOrder