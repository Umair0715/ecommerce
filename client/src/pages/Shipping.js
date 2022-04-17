import React , { useState } from 'react'
import CheckoutSteps from '../components/checkoutSteps/CheckoutSteps'
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { Country, State } from "country-state-city";
import { saveShippingInfo } from './../redux/actions/cartActions';
import { useDispatch , useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';

const Shipping = () => {
   const navigate = useNavigate();
   const alert = useAlert();
   const dispatch = useDispatch();
   const { shippingInfo } = useSelector(state => state.cart);

   const [address , setAddress] = 
   useState(shippingInfo ? shippingInfo.address : '');
   const [city , setCity] = 
   useState(shippingInfo ? shippingInfo.city : '');
   const [country , setCountry] = 
   useState(shippingInfo ? shippingInfo.country : '');
   const [pinCode , setPinCode] = 
   useState(shippingInfo ? shippingInfo.pinCode : '');
   const [state , setState] = 
   useState(shippingInfo ? shippingInfo.state : '');
   const [phoneNo , setPhoneNo] = 
   useState(shippingInfo ? shippingInfo.phoneNo : '');

   const updateSubmit = e => {
      e.preventDefault();
      if(phoneNo.length < 11 || phoneNo.length > 11 ){
         return alert.error('Phone No must contain 11 digits')
      }
      dispatch(saveShippingInfo({address , city , country , state , pinCode , phoneNo}));
      navigate('/confirmOrder')
   }

   return (
      <div className='shipping__container'>
         <CheckoutSteps activeStep={0} />
         <div className="updateProfile__container" style={{background: 'white'}}>
            <div className="updateProfile shipping__form">
               <h1 className="section__heading text-muted">Shipping Details</h1>
               <form
                  className="updateForm "
                  onSubmit={updateSubmit}
               >
                  <div className="updateName">
                  <HomeIcon style={{fontSize : 18}}/>
                  <input
                     type="text"
                     placeholder="Address"
                     value={address}
                     onChange={(e) => setAddress(e.target.value)}
                     required
                  />
                  </div>
                  <div className="updateEmail">
                  <LocationCityIcon  style={{fontSize: 18}}/>
                  <input
                     type="text"
                     placeholder="City"
                     value={city}
                     onChange={(e) => setCity(e.target.value)}
                     required

                  />
                  </div>

                  <div className="updateEmail">
                  <PinDropIcon  style={{fontSize: 18}}/>
                  <input
                     type="number"
                     placeholder="Pin Code"
                     value={pinCode}
                     onChange={(e) => setPinCode(e.target.value)}
                     required

                  />
                  </div>
                  <div className="updateEmail">
                  <PhoneIcon  style={{fontSize: 18}}/>
                  <input
                     type="number"
                     placeholder="Phone No"
                     value={phoneNo}
                     onChange={(e) => setPhoneNo(e.target.value)}
                     required

                  />
                  </div>
                  <div className="updateEmail">
                     <PublicIcon  style={{fontSize: 18}}/>
                     <select
                        required
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                     >
                        <option value="">Country</option>
                        {Country &&
                           Country.getAllCountries().map((item) => (
                           <option key={item.isoCode} value={item.isoCode}>
                              {item.name}
                           </option>
                           ))}
                     </select>
                  </div>

               {country && (
                  <div className="updateEmail">
                     <TransferWithinAStationIcon  style={{fontSize: 18}}/>

                     <select
                        required
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                     >
                        <option value="">State</option>
                        {State &&
                        State.getStatesOfCountry(country).map((item) => (
                           <option key={item.isoCode} value={item.isoCode}>
                              {item.name}
                           </option>
                        ))}
                     </select>
                  </div>
               )}

                  <button type="submit" className="signUpBtn mt-20">
                     Continue
                  </button>
               </form>
            </div>
         </div>
      </div>
   )
}

export default Shipping