import { useEffect, useState } from "react";
import {useSelector , useDispatch } from 'react-redux';
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import { clearErrors, resetPassword } from "../../redux/actions/userActions";
import { useNavigate , useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { RESET_PASSWORD_RESET } from './../../redux/constants/userConstants'


const ResetPassword = () => {
   const { token } = useParams();
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const [password , setPassword ] = useState('');
   const [confirmPassword , setConfirmPassword ] = useState('');
   const alert = useAlert();

   const { loading , error , message } = useSelector(state => state.updatePassword)

   const updateSubmit = (e) => {
      e.preventDefault();
      dispatch(resetPassword({password , confirmPassword }, token , navigate));
   }

   useEffect(() => {
      if(error){
         alert.error(error);
         dispatch(clearErrors());
      }
      if(message){
         alert.success(message);
         dispatch({ type : RESET_PASSWORD_RESET});
      }
   }, [error , alert , dispatch , message])

   return (
      <div className="updateProfile__container">
      <div className="updateProfile">
         <h1 className="section__heading text-muted">Reset Password</h1>
         <form
            className="updateForm"
            onSubmit={updateSubmit}
         >
            <div className="updateEmail">
            <LockOpenIcon  style={{fontSize: 18}}/>
            <input
               type="password"
               placeholder="Password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
            />
            </div>

            <div className="updateEmail">
            <LockIcon  style={{fontSize: 18}}/>
            <input
               type="password"
               placeholder="Confirm Password"
               value={confirmPassword}
               onChange={(e) => setConfirmPassword(e.target.value)}
            />
            </div>
            <button type="submit" className="signUpBtn mt-20">
            {loading ? 'Reseting Password...' : 'Reset'}
            </button>
         </form>
      </div>
   </div>
   )
}

export default ResetPassword;