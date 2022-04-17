import CheckoutSteps from "../components/checkoutSteps/CheckoutSteps";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ConfirmOrder = () => {
   const { shippingInfo, cartItems } = useSelector((state) => state.cart);
   const { user } = useSelector((state) => state.login);
   const navigate = useNavigate();
   const subtotal = cartItems.reduce(
      (acc, item) => Math.round(acc + item.qty * item.price),
      0
   );

   const shippingCharges = subtotal > 1000 ? 0 : 200;
   const tax = Math.round(subtotal * 0.10);
   const totalPrice = Math.round(subtotal + tax + shippingCharges);

   const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

   const proceedToCheckoutHandler = () => {
      const orderInfo = {
         shippingCharges ,
         totalPrice ,
         tax ,
         subtotal
      }
      sessionStorage.setItem('orderInfo' , JSON.stringify(orderInfo));
      navigate('/payment/process')
   }

   return (
      <div className="confirmOrder__container">
         <CheckoutSteps activeStep={1} />
         <div className='confirmOrder'>
            <div className='confirmOrder__details font-sm'>
               <div className=''>
                  <h3 className='font-xl font-500 text-dark'>Shipping Info</h3>
                  <div className='mt-30'>
                     <strong className='font-base font-500'>Name:</strong>
                     <p>{user ? user.name : ''}</p>
                  </div>
                  <div>
                     <strong className='font-base font-500'>Phone:</strong>
                     <p>{shippingInfo.phoneNo}</p>
                  </div>
                  <div>
                     <strong className='font-base font-500'>Adress:</strong>
                     <p>{address}</p>
                  </div>
               </div>

               <div>
                  <h3 className='font-xl text-dark font-500'>Your Cart Items</h3>
                  {
                     cartItems && cartItems.length > 0 && 
                     cartItems.map(item => (
                        <div key={item.product}>
                           <img src={item.images && item.images[0].url} alt={item.name}></img>
                           <p>{item.name}</p>
                           <p>
                              {item.qty} * {item.price} = {Math.round(item.qty * item.price)}
                           </p>
                        </div>
                     ))
                  }
               </div>
            </div>
            <div className='confirmOrder__total'>
               <div>
                  <h3 className='section__heading'>Order Summary</h3>
                  <div className='font-sm ' style={{padding: '5rem 0 3rem 0'}}>
                     <div>
                        <strong className='font-base font-500'>SubTotal:</strong>
                        <p>{Math.round(subtotal)}</p>
                     </div>
                     <div>
                        <strong className='font-base font-500'>Shipping Charges:</strong>
                        <p>{Math.round(shippingCharges)}</p>
                     </div>
                     <div>
                        <strong className='font-base font-500'>GST:</strong>
                        <p>{Math.round(tax)}</p>
                     </div>

                  </div>
                  
                  <div className='proceed__btn '>
                     <div className='confirm__grossTotal font-18 font-bold flex items-center justify-between mt-10'>
                        <strong>TOTAL</strong>
                        <strong>PKR: {Math.round(totalPrice)}</strong>
                     </div>
                     <div className='w-100 mt-30'>
                        <button className='btn btn-primary m-auto'
                        onClick={proceedToCheckoutHandler}>
                           Proceed To Payment
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ConfirmOrder;