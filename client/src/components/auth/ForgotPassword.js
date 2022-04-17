import { useEffect, useState } from "react";
import { useDispatch , useSelector } from 'react-redux';
import { forgotPassword , clearErrors } from "../../redux/actions/userActions";
// import { useNavigate } from 'react-router-dom';
import { useAlert } from "react-alert";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { FORGOT_PASSWORD_RESET } from './../../redux/constants/userConstants'


const ForgotPassword = () => {
   const dispatch = useDispatch();
   const [email , setEmail ] = useState('');
   const alert = useAlert();

   const { error , loading , success } = useSelector(state => state.updatePassword);

   const updateSubmit = (e) => {
      e.preventDefault();
      dispatch(forgotPassword(email));
   }

   useEffect(() => {
      if(error){
         alert.error(error);
         dispatch(clearErrors());
      }
      if(success){
         alert.success('Open Youe Email to reset password.')
         dispatch({ type : FORGOT_PASSWORD_RESET})
         setEmail('');
      }
   }, [error , alert , dispatch , success])

   return (
      <div className="updateProfile__container">
      <div className="updateProfile">
         <h1 className="section__heading text-muted">Forgot Password</h1>
         <form
            className="updateForm"
            onSubmit={updateSubmit}
         >
            <div className="updateName">
            <MailOutlineIcon style={{fontSize : 18}}/>
            <input
               type="email"
               required
               placeholder="Email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
            />
            </div>
            <button type="submit" className="signUpBtn mt-20">
            {loading ? 'Email Sending...' : 'Send Mail'}
            </button>
         </form>
      </div>
   </div>
   )
}

export default ForgotPassword