import { useParams , Link  } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { clearErrors, getOrderDetails } from '../redux/actions/orderActions';
import { useAlert } from 'react-alert';
import { Typography } from "@material-ui/core";
import Loader from './../components/loader/Loader';

const OrderDetails = () => {
   const alert = useAlert();
   const { id } = useParams();
   const dispatch = useDispatch();
   const { error , loading , orderDetails } = useSelector(state => state.orderDetails)

   useEffect(() => {
      if(error){
         alert.error(error);
         dispatch(clearErrors());
      }
      dispatch(getOrderDetails(id));
   } , [dispatch , id , error , alert ])


   return (
      loading ? <Loader />
      : orderDetails ?
      <>
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
    </>
      : ''
   )
}

export default OrderDetails