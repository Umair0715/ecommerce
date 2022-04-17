import {
   USER_LOGIN_REQUEST ,
   USER_LOGIN_SUCCESS , 
   USER_LOGIN_FAIL ,
   USER_REGISTER_REQUEST ,
   USER_REGISTER_SUCCESS ,
   USER_REGISTER_FAIL ,
   CLEAR_ERRORS,
   USER_AVATAR_REQUEST,
   USER_AVATAR_SUCCESS,
   USER_AVATAR_FAIL ,
   USER_LOAD_REQUEST,
   USER_LOAD_SUCCESS,
   USER_LOAD_FAIL,
   USER_LOGOUT_REQUEST,
   USER_LOGOUT_SUCCESS,
   USER_LOGOUT_FAIL ,
   USER_UPDATE_REQUEST,
   USER_UPDATE_SUCCESS,
   USER_UPDATE_FAIL,
   UPDATE_PASSWORD_REQUEST ,
   UPDATE_PASSWORD_SUCCESS ,
   UPDATE_PASSWORD_FAIL ,
   FORGOT_PASSWORD_REQUEST,
   FORGOT_PASSWORD_FAIL,
   FORGOT_PASSWORD_SUCCESS,
   RESET_PASSWORD_REQUEST,
   RESET_PASSWORD_FAIL,
   RESET_PASSWORD_SUCCESS,
   ALL_USERS_FAIL ,
   ALL_USERS_REQUEST ,
   ALL_USERS_SUCCESS ,
   DELETE_USER_REQUEST ,
   DELETE_USER_SUCCESS ,
   DELETE_USER_FAIL ,
   UPDATE_USER_REQUEST ,
   UPDATE_USER_SUCCESS ,
   UPDATE_USER_FAIL ,
   USER_DETAILS_REQUEST ,
   USER_DETAILS_SUCCESS ,
   USER_DETAILS_FAIL
}
from './../constants/userConstants';
import axios from 'axios';

// LOGIN USER
export const login = (email , password ) => async dispatch => {
   dispatch({ type : USER_LOGIN_REQUEST });
   try{
      const config = {
         headers : {
            "Content-Type" : "application/json"
         }
      }
      const { data : { user } } = await axios.post('/api/v1/user/login' , { email , password } , config)

      dispatch({ type : USER_LOGIN_SUCCESS , payload : user })
   }catch(err){
      dispatch({ type : USER_LOGIN_FAIL , payload : err.response && err.response.data.message ? err.response.data.message : err.message || 'something went wrong.'})
   }
}

// REGISTER USER
export const register = userData  => async (dispatch) => {
   dispatch({ type : USER_REGISTER_REQUEST });
   try{
      const config = {
         headers : {
            "Content-Type" : "application/json"
         }
      }
      const { data : { user } } =  await axios.post('/api/v1/user/register' , userData , config)

      dispatch({ type : USER_REGISTER_SUCCESS , payload : user })

   }catch(err){
      dispatch({ type : USER_REGISTER_FAIL , payload : err.response && err.response.data.message ? err.response.data.message : err.message || 'something went wrong.'})
   }
}


// ADD USER AVATAR
export const addAvatar = ( data ) => async (dispatch , getState) => {
   dispatch({ type : USER_AVATAR_REQUEST})
   try{
      const { user : { _id : id }} = getState().register;
      const { data : { user } } = await axios.put(`/api/v1/user/avatar/${id}` , data);
      dispatch({ type : USER_AVATAR_SUCCESS})
      dispatch({ type : USER_LOGIN_SUCCESS , payload : user })
   }catch(err){
      dispatch({ type : USER_AVATAR_FAIL , payload : err.message})
   }
}

// ADD USER AVATAR
export const updateAvatar = ( data , id ) => async dispatch  => {
   dispatch({ type : USER_AVATAR_REQUEST})
   try{
      const { data : { user } } = await axios.put(`/api/v1/user/avatar/${id}` , data);
      dispatch({ type : USER_AVATAR_SUCCESS})
      dispatch({ type : USER_LOGIN_SUCCESS , payload : user })
   }catch(err){
      dispatch({ type : USER_AVATAR_FAIL , payload : err.message})
   }
}

// UPDATE PASSWORD
export const updatePassword = ( data , navigate ) => async dispatch => {
   dispatch({ type : UPDATE_PASSWORD_REQUEST})
   try{
      const { data : { message } } = await axios.put(`/api/v1/user/updatePassword` , data);
      dispatch({ type : UPDATE_PASSWORD_SUCCESS , payload : message});
      loadUser();
      navigate('/profile');
   }catch(err){
      dispatch({ type : UPDATE_PASSWORD_FAIL , payload : err.response && err.response.data.message ? err.response.data.message : err.message || 'something went wrong.'})
   }
}

// FORGOT PASSWORD
export const forgotPassword =  email => async dispatch => {
   dispatch({ type : FORGOT_PASSWORD_REQUEST})
   try{
      await axios.post(`/api/v1/user/forgotPassword` , {email} );
      dispatch({ type : FORGOT_PASSWORD_SUCCESS });
   }catch(err){
      dispatch({ type : FORGOT_PASSWORD_FAIL , payload : err.response && err.response.data.message ? err.response.data.message : err.message || 'something went wrong.'})
   }
}

// RESET PASSWORD
export const resetPassword =  (data , token , navigate) => async dispatch => {
   dispatch({ type : RESET_PASSWORD_REQUEST})
   try{
      const {data : { user } } =await axios.post(`/api/v1/user/resetPassword/${token}` , data );
      dispatch({ type : RESET_PASSWORD_SUCCESS , payload : 'Password Reset Successfully.'});
      dispatch({ type : USER_LOGIN_SUCCESS , payload : user});
      navigate('/profile');

   }catch(err){
      dispatch({ type : RESET_PASSWORD_FAIL , payload : err.response && err.response.data.message ? err.response.data.message : err.message || 'something went wrong.'})
   }
}

// UPDATE USER
export const updateUser = ( data ) => async (dispatch , getState) => {
   dispatch({ type : USER_UPDATE_REQUEST})
   try{
      await axios.put(`/api/v1/user/updateProfile` , data);
      dispatch({ type : USER_UPDATE_SUCCESS});
   }catch(err){
      dispatch({ type : USER_UPDATE_FAIL , payload : err.response && err.response.data.message ? err.response.data.message : err.message || 'something went wrong.'})
   }
}

// LOAD USER
export const loadUser = () => async dispatch => {
   dispatch({ type : USER_LOAD_REQUEST });
   try{
      const { data : { user } } = await axios.get('/api/v1/user/profile');
      dispatch({ type : USER_LOAD_SUCCESS , payload : user})
   }catch(err){
      dispatch({ type : USER_LOAD_FAIL , payload : err.response && err.response.data.message ? err.response.data.message : err.message || 'something went wrong.'})
     
   }
}

// LOGOUT USER 
export const logoutUser = () => async dispatch => {
   dispatch({ type : USER_LOGOUT_REQUEST });
   try{
      await axios.get('/api/v1/user/logout');
      dispatch({ type : USER_LOGOUT_SUCCESS })
   }catch(err){
      dispatch({ type : USER_LOGOUT_FAIL , payload : err.response && err.response.data.message ? err.response.data.message : err.message || 'something went wrong.'})
     
   }
}

// CLEAR ERRORS 
export const clearErrors = () => async dispatch => {
   dispatch({ type : CLEAR_ERRORS})
}

// ADMIN ACTIONS

// ALL USERS 
export const getAllUsers = () => async dispatch => {
   dispatch({ type : ALL_USERS_REQUEST });
   try{
      const config = {
         headers : {
            "Content-Type" : "application/json"
         }
      }
      const { data : { users } } = await axios.get('/api/v1/user/all' , config)

      dispatch({ type : ALL_USERS_SUCCESS , payload : users })
   }catch(err){
      dispatch({ type : ALL_USERS_FAIL , payload : err.response && err.response.data.message ? err.response.data.message : err.message || 'something went wrong.'})
   }
}

// USER DETAILS 
export const getUserDetails = id => async dispatch => {
   dispatch({ type : USER_DETAILS_REQUEST });
   try{
      const config = {
         headers : {
            "Content-Type" : "application/json"
         }
      }
      const { data : { user } } = await axios.get(`/api/v1/user/${id}` , config)

      dispatch({ type : USER_DETAILS_SUCCESS , payload : user })
   }catch(err){
      dispatch({ type : USER_DETAILS_FAIL , payload : err.response && err.response.data.message ? err.response.data.message : err.message || 'something went wrong.'})
   }
}

// UPDATE USER BY ADMIN
export const updateUserByAdmin = (id , data ) => async dispatch => {
   dispatch({ type : UPDATE_USER_REQUEST });
   try{
      const config = {
         headers : {
            "Content-Type" : "application/json"
         }
      }
      await axios.put(`/api/v1/user/${id}` , data , config)
      dispatch({ type : UPDATE_USER_SUCCESS })
   }catch(err){
      dispatch({ type : UPDATE_USER_FAIL , payload : err.response && err.response.data.message ? err.response.data.message : err.message || 'something went wrong.'})
   }
}

// DELETE USER BY ADMIN
export const deleteUser = id => async dispatch => {
   dispatch({ type : DELETE_USER_REQUEST });
   try{
      const config = {
         headers : {
            "Content-Type" : "application/json"
         }
      }
      await axios.delete(`/api/v1/user/${id}`  , config)
      dispatch({ type : DELETE_USER_SUCCESS })
   }catch(err){
      dispatch({ type : DELETE_USER_FAIL , payload : err.response && err.response.data.message ? err.response.data.message : err.message || 'something went wrong.'})
   }
}