import { useEffect, useState } from "react";
import {useSelector , useDispatch } from 'react-redux';
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { clearErrors, updatePassword } from "../../redux/actions/userActions";
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { UPDATE_PASSWORD_RESET } from './../../redux/constants/userConstants'

const UpdatePassword = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const [oldPassword , setOldPassword ] = useState('');
   const [newPassword , setNewPassword ] = useState('');
   const [confirmPassword , setConfirmPassword ] = useState('');
   const alert = useAlert();

   const { loading , error , message } = useSelector(state => state.updatePassword);

   const updateSubmit = (e) => {
      e.preventDefault();
      dispatch(updatePassword({oldPassword , newPassword , confirmPassword} , navigate));
   }

   useEffect(() => {
      if(error){
         alert.error(error);
         dispatch(clearErrors());
      }
      if(message){
         alert.success(message);
         dispatch({ type : UPDATE_PASSWORD_RESET});
      }
   }, [error , alert , dispatch , message])

   return (
      <div className="updateProfile__container">
      <div className="updateProfile">
         <h1 className="section__heading text-muted">Update Password</h1>

         {/**************** REGISTER FORM *****************/}
         <form
            className="updateForm"
            onSubmit={updateSubmit}
         >
            <div className="updateName">
            <VpnKeyIcon style={{fontSize : 18}}/>
            <input
               type="password"
               placeholder="Old Password"
               value={oldPassword}
               onChange={(e) => setOldPassword(e.target.value)}
               required
            />
            </div>
            <div className="updateEmail">
            <LockOpenIcon  style={{fontSize: 18}}/>
            <input
               type="password"
               placeholder="New Password"
               value={newPassword}
               onChange={(e) => setNewPassword(e.target.value)}
               required

            />
            </div>

            <div className="updateEmail">
            <LockIcon  style={{fontSize: 18}}/>
            <input
               type="password"
               placeholder="Confirm Password"
               value={confirmPassword}
               onChange={(e) => setConfirmPassword(e.target.value)}
               required

            />
            </div>
            <button type="submit" className="signUpBtn mt-20">
            {loading ? 'Updating Password...' : 'Update'}
            </button>
         </form>
      </div>
      </div>
   )
}

export default UpdatePassword