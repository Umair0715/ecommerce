import React, { useEffect, useRef , useState} from "react";
import CheckoutSteps from "../components/checkoutSteps/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useNavigate } from "react-router-dom";
import { clearErrors, createOrder } from './../redux/actions/orderActions';


const Payment = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const alert = useAlert();
   const stripe = useStripe();
   const elements = useElements();
   const payBtn = useRef(null);
   const [paymentLoading , setPaymentLoading ] = useState(false);
   
   const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
   const { shippingInfo, cartItems } = useSelector((state) => state.cart);
   const { user } = useSelector((state) => state.login);
   const { error : orderError  } = useSelector(state => state.order)
 
   const paymentData = {
     amount: Math.round(orderInfo.totalPrice * 100),
   };
   const newOrder = {
      orderItems : cartItems,
      shippingInfo ,
      itemsPrice : orderInfo.subtotal,
      taxPrice : orderInfo.tax ,
      totalPrice : orderInfo.totalPrice ,
      shippingPrice : orderInfo.shippingCharges,
   }
 
   const submitHandler = async (e) => {
      setPaymentLoading(true);
      e.preventDefault();
      payBtn.current.disabled = true;
   
      try {
         const config = {
            headers: {
            "Content-Type": "application/json",
            },
         };
         const { data } = await axios.post(
            "/api/v1/payment/process",
            paymentData,
            config
         );
 
         const client_secret = data.client_secret;
   
         if (!stripe || !elements) {
         setPaymentLoading(false);
         return;
         }
 
         const result = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details: {
               name: user.name,
               email: user.email,
               address: {
                  line1: shippingInfo.address,
                  city: shippingInfo.city,
                  state: shippingInfo.state,
                  postal_code: shippingInfo.pinCode,
                  country: shippingInfo.country,
               },
            },
            },
         });
 
         if (result.error) {
            setPaymentLoading(false);
            payBtn.current.disabled = false;
         
            alert.error(result.error.message);
         } else {
            if (result.paymentIntent.status === "succeeded") {
               newOrder.paymentInfo = {
                  id : result.paymentIntent.id ,
                  status : result.paymentIntent.status 
               }
               newOrder.paidAt = Date.now();
               dispatch(createOrder(newOrder))
               setPaymentLoading(false);
               navigate("/success");
            } else {
               setPaymentLoading(false);
               alert.error("There's some issue while processing payment ");
            }
         }
      } catch (error) {
         setPaymentLoading(false);
         payBtn.current.disabled = false;
         alert.error(error.response.data.message);
      }
   };

   useEffect(() => {
      if(orderError){
         alert.error(orderError);
         dispatch(clearErrors());
      }
   }, [dispatch , orderError , alert ])
 
 
   return (
     <div className='payment__wrapper'>
       <CheckoutSteps activeStep={2} />
       <div className="paymentContainer">
         <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
           <Typography>Card Info</Typography>
           <div>
             <CreditCardIcon />
             <CardNumberElement className="paymentInput" />
           </div>
           <div>
             <EventIcon />
             <CardExpiryElement className="paymentInput" />
           </div>
           <div>
             <VpnKeyIcon />
             <CardCvcElement className="paymentInput" />
           </div>
 
           <input
             type="submit"
             value={`${paymentLoading ? 'Please Wait...' : `Pay - PKR:${orderInfo && orderInfo.totalPrice}`}`}
             ref={payBtn}
             className="paymentFormBtn"
           />
         </form>
       </div>
     </div>
   );
 };
 
 export default Payment;