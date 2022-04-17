import React, { useEffect } from 'react'
import { useDispatch , useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import DashboardMenu from './../../components/dashboard/DashboardMenu';
import Loader from './../../components/loader/Loader';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useNavigate } from 'react-router-dom';
import { DELETE_USER_RESET } from '../../redux/constants/userConstants';
import { getAllUsers , clearErrors, deleteUser } from '../../redux/actions/userActions';

const UsersList = () => {
   const navigate = useNavigate();
   const alert = useAlert();
   const dispatch = useDispatch();
   const { loading , error , users } = useSelector(state => state.allUsers);
   const { loading : delLoading , error : delError , isDeleted} = useSelector(state => state.delUpdateUser);

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
         alert.success('USER Deleted Successfully.')
         dispatch({ type : DELETE_USER_RESET });
         dispatch(getAllUsers())
      }
      
      dispatch(getAllUsers())
   }, [dispatch , error , alert , delError , isDeleted , navigate ])


   const deleteUserHandler = id => {
      dispatch(deleteUser(id))
   }

   return (
      <div className='admin__products'>
         <DashboardMenu />
         <div className='admin__products__container'>
            <h3 className='font-xl font-500 text-dark text-center'>All Users</h3>
            {delLoading && <Loader /> }
            <div className='admin__products__table'>
            {
               loading ? <Loader />
               :
               users && users.length > 0 ? 
               <div className=''>
                 <table>
                    <thead>
                        <tr>
                           <th scope='col'>User ID</th>
                           <th scope='col'>Name</th>
                           <th scope='col'>Email</th>
                           <th scope='col'>Status</th>
                           <th scope='col'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                           users && users.map(user => (
                              <tr key={user._id}>
                                 <td data-label='User ID'>{user._id}</td>
                                 <td data-label='Name'
                                 >{user.name}</td>
                                 <td data-label='Email'>{user.email}</td>
                                 <td data-label='Status'>{user.isAdmin ? 'Admin' : 'User'}</td>
                                 <td data-label='Action' className='text-main pointer  '>
                                       <EditIcon 
                                       style={{color: 'green' , marginRight: '1rem'}} 
                                       onClick={() => navigate(`/admin/user/update/${user._id}`)}
                                       />

                                       <DeleteIcon 
                                       title='Delete User' 
                                       onClick={() => deleteUserHandler(user._id)}
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
                 <h3 className='text-error'>No User Found.</h3>
              </div>
            }
            </div>
         </div>
      </div>
   )
}

export default UsersList;