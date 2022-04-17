import "./Header.css";
import React, { useState } from 'react'
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { HomeOutlined } from '@material-ui/icons';
import ListAltIcon from "@material-ui/icons/ListAlt";
import  ShoppingCartIcon  from '@material-ui/icons/ShoppingCart'
import { useNavigate } from 'react-router-dom';
import { logoutUser } from './../../../redux/actions/userActions'
import { useDispatch , useSelector  } from 'react-redux';
import { useAlert } from 'react-alert';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(() => ({
   staticTooltipLabel: {
     fontSize: 14 ,
     backgroundColor: 'lighgrey' , 
     color: 'black' , 
     
   },
 }));

const UserOptions = ({ user }) => {
   const classes = useStyles();
   const alert = useAlert();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [open , setOpen ] = useState(false);
   const { cartItems } = useSelector(state => state.cart);

   const orders = () => {
      navigate('/myOrders')
   }
   const profile = () => {
      navigate('/profile')
   }
   const logout = async () => {
      await dispatch(logoutUser());
      alert.success('Logout Successfully.')
      navigate('/login')
   }
   const dashboard = () => {
      navigate('/admin/dashboard')
   }  
   const home = () => {
      navigate('/');
   }

   const cart = () => {
      navigate('/cart');
   }

   const options = [
      { icon : <HomeOutlined className='userOptions_icon' />  , name : 'Home' , func : home} ,
      { icon : <ListAltIcon className='userOptions_icon'  />  , name : 'Orders' , func : orders} ,
      { icon : <ShoppingCartIcon className='userOptions_icon' style={{color: cartItems.length > 0 ? 'tomato' : 'unset'}} /> , name : `Cart(${cartItems.length})` , func : cart} ,
      { icon : <PersonIcon className='userOptions_icon' />  , name : 'Profile' , func : profile} ,
      { icon : <ExitToAppIcon className='userOptions_icon' />  , name : 'logout' , func : logout}
     
   ]  
   if(user.isAdmin){
      options.unshift({
         icon : <DashboardIcon className='userOptions_icon' />, 
         name : "Dashboard" ,
         func : dashboard
      })
   }

   return (
      <div className='userOptions'>
         <Backdrop open={open} style={{ zIndex: "10" }} />
         <SpeedDial
         ariaLabel="SpeedDial tooltip example"
         sx={{fontSize: 20}}
         onClose={() => setOpen(false)}
         onOpen={() => setOpen(true)}
         open={open}
         direction="down"
         className="speedDial"
         icon={
            <img
               className="speedDialIcon"
               src={user.avatar.url ? user.avatar.url : "/Profile.png"}
               alt="Profile"
            />
         }
         >
         {options.map((item) => (
            <SpeedDialAction
               classes={classes}
               key={item.name}
               icon={item.icon}
               tooltipTitle={item.name}
               onClick={item.func}
               tooltipOpen
            />
         ))}
         </SpeedDial>
      </div>
   )
}

export default UserOptions