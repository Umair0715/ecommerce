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
   USER_AVATAR_FAIL,
   USER_LOAD_REQUEST,
   USER_LOAD_SUCCESS,
   USER_LOAD_FAIL ,
   USER_LOGOUT_REQUEST,
   USER_LOGOUT_SUCCESS,
   USER_LOGOUT_FAIL,
   USER_UPDATE_REQUEST,
   USER_UPDATE_SUCCESS,
   USER_UPDATE_FAIL,
   USER_UPDATE_RESET ,
   UPDATE_PASSWORD_REQUEST ,
   UPDATE_PASSWORD_SUCCESS ,
   UPDATE_PASSWORD_FAIL , 
   UPDATE_PASSWORD_RESET,
   FORGOT_PASSWORD_REQUEST,
   FORGOT_PASSWORD_FAIL,
   FORGOT_PASSWORD_SUCCESS,
   FORGOT_PASSWORD_RESET ,
   RESET_PASSWORD_REQUEST,
   RESET_PASSWORD_FAIL,
   RESET_PASSWORD_SUCCESS,
   RESET_PASSWORD_RESET ,
   ALL_USERS_FAIL ,
   ALL_USERS_REQUEST ,
   ALL_USERS_SUCCESS ,
   DELETE_USER_REQUEST ,
   DELETE_USER_SUCCESS ,
   DELETE_USER_FAIL ,
   DELETE_USER_RESET ,
   UPDATE_USER_REQUEST ,
   UPDATE_USER_SUCCESS ,
   UPDATE_USER_FAIL ,
   UPDATE_USER_RESET ,
   USER_DETAILS_REQUEST ,
   USER_DETAILS_SUCCESS ,
   USER_DETAILS_FAIL
}
from './../constants/userConstants';

export const loginReducer = (state={ user : null  } , action ) => {
   switch (action.type) {
      case USER_LOGIN_REQUEST:
      case USER_LOAD_REQUEST :
      case USER_LOGOUT_REQUEST :
         return {
            loading : true 
         }
      case USER_LOGIN_SUCCESS:
      case USER_LOAD_SUCCESS :
         return {
            loading : false ,
            user : action.payload ,
            isAuthenticated : true , 
         } 
      case USER_LOGOUT_SUCCESS: 
         return {
            loading : false ,
            isAuthenticated : false ,
            user : null 
         }
      case USER_LOGIN_FAIL: 
      case USER_LOAD_FAIL:
      case USER_LOGOUT_FAIL:
         return {
            loading : false,
            user : null ,
            isAuthenticated : false ,
            error : action.payload 
         }
      case CLEAR_ERRORS : 
         return {
            ...state ,
            error : null 
         }
      default:
         return state ;
   }
}

export const registerReducer = (state={ user : null  } , action ) => {
   switch (action.type) {
      case USER_REGISTER_REQUEST:
         return {
            loading : true 
         }
      case USER_REGISTER_SUCCESS:
         return {
            loading : false,
            user : action.payload ,
            isAuthenticated : true ,
         }
      case USER_REGISTER_FAIL: 
         return {
            loading : false,
            user : null ,
            isAuthenticated : false ,
            error : action.payload 
         }
      case CLEAR_ERRORS : 
         return {
            ...state ,
            error : null 
         }
      default:
         return state ;
   }
}

export const avatarReducer = (state={} , action ) => {
   switch (action.type) {
      case USER_AVATAR_REQUEST:
         return {
            loading : true 
         }
      case USER_AVATAR_SUCCESS:
         return {
            loading : false,
            success: true 
         }
      case USER_AVATAR_FAIL: 
         return {
            loading : false,
            error : action.payload 
         }
      case CLEAR_ERRORS : 
         return {
            ...state ,
            error : null 
         }
      default:
         return state ;
   }
}

export const userUpdateReducer = (state={ isUpdated : false } , action ) => {
   switch (action.type) {
      case USER_UPDATE_REQUEST:
         return {
            loading : true 
         }
      case USER_UPDATE_SUCCESS:
         return {
            loading : false,
            isUpdated : true 
         }
      case USER_UPDATE_FAIL: 
         return {
            loading : false,
            error : action.payload 
         }
      case USER_UPDATE_RESET:
         return {
            ...state ,
            isUpdated : false 
         }
      case CLEAR_ERRORS : 
         return {
            ...state ,
            error : null 
         }
      default:
         return state ;
   }
}

export const updatePasswordReducer = (state={ message : null } , action ) => {
   switch (action.type) {
      case UPDATE_PASSWORD_REQUEST:
      case FORGOT_PASSWORD_REQUEST:
      case RESET_PASSWORD_REQUEST:
         return {
            loading : true 
         }
      case UPDATE_PASSWORD_SUCCESS:
      case RESET_PASSWORD_SUCCESS:
         return {
            loading : false,
            message : action.payload 
         }
      case FORGOT_PASSWORD_SUCCESS: 
         return {
            loading : false ,
            success : true,
         }
      case UPDATE_PASSWORD_FAIL: 
      case FORGOT_PASSWORD_FAIL:
      case RESET_PASSWORD_FAIL: 
         return {
            loading : false,
            error : action.payload 
         }
      case UPDATE_PASSWORD_RESET:
      case RESET_PASSWORD_RESET:
         return {
            ...state ,
            message : null  
         }
      case FORGOT_PASSWORD_RESET:
         return {
            ...state,
            success : false
         }
      case CLEAR_ERRORS : 
         return {
            ...state ,
            error : null 
         }
      default:
         return state ;
   }
}

export const allUsersReducer = (state={ users : [] } , action ) => {
   switch (action.type) {
      case ALL_USERS_REQUEST:
         return {
            loading : true 
         }
      case ALL_USERS_SUCCESS:
         return {
            loading : false,
            users : action.payload ,
         }
      case ALL_USERS_FAIL: 
         return {
            loading : false,
            error : action.payload 
         }
      case CLEAR_ERRORS : 
         return {
            ...state ,
            error : null 
         }
      default:
         return state ;
   }
}

export const userDetailsReducer = (state={ user : null  } , action ) => {
   switch (action.type) {
      case USER_DETAILS_REQUEST:
         return {
            loading : true 
         }
      case USER_DETAILS_SUCCESS:
         return {
            loading : false,
            user : action.payload ,
         }
      case USER_DETAILS_FAIL: 
         return {
            loading : false,
            error : action.payload 
         }
      case CLEAR_ERRORS : 
         return {
            ...state ,
            error : null 
         }
      default:
         return state ;
   }
}

export const delUpdateUserReducer = (state={ } , action ) => {
   switch (action.type) {
      case UPDATE_USER_REQUEST:
      case DELETE_USER_REQUEST:
         return {
            loading : true 
         }
      case UPDATE_USER_SUCCESS:
         return {
            loading : false,
            isUpdated : true 
         }
      case DELETE_USER_SUCCESS:
         return {
            loading : false,
            isDeleted : true 
         }
      case UPDATE_USER_FAIL: 
      case DELETE_USER_FAIL: 
         return {
            loading : false,
            error : action.payload 
         }
      case DELETE_USER_RESET: 
         return {
            loading: false ,
            isDeleted: false 
         }
      case UPDATE_USER_RESET:
         return {
            ...state ,
            isUpdated : false 
         }
      case CLEAR_ERRORS : 
         return {
            ...state ,
            error : null 
         }
      default:
         return state ;
   }
}