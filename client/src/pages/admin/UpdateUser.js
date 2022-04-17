import './Admin.css';
import React, { useEffect, useState } from 'react'
import { useSelector , useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import DashboardMenu from '../../components/dashboard/DashboardMenu'
import { clearErrors , getUserDetails , updateUserByAdmin } from '../../redux/actions/userActions';
import { useAlert } from 'react-alert';
import Loader from '../../components/loader/Loader';
import FaceIcon from "@material-ui/icons/Face";
import { UPDATE_USER_RESET } from '../../redux/constants/userConstants';
import { useNavigate } from 'react-router-dom';

const UpdateUser = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const alert = useAlert();
   const { id } = useParams();
   const [name , setName] = useState('');
   const [status , setStatus] = useState();
   const { error , loading , user } = useSelector(state => state.userDetails )
   const { error : updateError , loading : updateLoading , isUpdated } = useSelector(state => state.delUpdateUser); 

   useEffect(() => {

      if(error){
         alert.error(error);
         dispatch(clearErrors())
      }
      if(updateError){
         alert.error(updateError);
         dispatch(clearErrors());
      }
      if(isUpdated){
         alert.success('User Updated Successfully.');
         dispatch({ type : UPDATE_USER_RESET })
         navigate('/admin/users')
      }

      dispatch(getUserDetails(id));

   }, [dispatch  , id , alert , error , updateError , isUpdated , navigate ]);

   useEffect( () => {
      if(user){
         setName(user && user.name);
         setStatus(user && user.isAdmin ? 'Admin' : 'User')
      }
   }, [user]);

   const updateSubmit = e => {
      e.preventDefault();
      dispatch(updateUserByAdmin(id , { 
         name ,
         isAdmin : status 
      }))
   }

   return (
      <div className='updateUser__container'>
         <DashboardMenu />
         {
            loading ? <Loader />
            : 
            <div className='updateUserForm'>
               <form onSubmit={updateSubmit}>
               <h3 className='font-xl font-500 text-dark text-center'>Update User</h3>
                  <div className='form__input'>
                     <FaceIcon style={{fontSize : 18}}/>
                     <input 
                     placeholder='User Name'
                     type='text' 
                     value={name}
                     onChange={(e) => setName(e.target.value) }
                     />
                  </div>
                  <select onChange={(e) => setStatus(e.target.value)}>
                     <option value=''>Choose Status</option>
                     <option value={false}>User</option>
                     <option value={true}>Admin</option>
                  </select>
                  <div className='w-100 text-center'>
                     <button type='submit' className='btn btn-primary '
                     style={{ width: '100%'}}
                     disabled={ updateLoading || status === '' ? true : false}
                     >{ updateLoading ? 'Updating...' : 'Update'}</button>
                  </div>
               </form>
            </div>
         }
      </div>
   )
}

export default UpdateUser