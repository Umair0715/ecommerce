import React from 'react'
import { useNavigate  } from 'react-router-dom'

const Profile = ({ user }) => {
   const navigate = useNavigate();


   return (
      user && user.name ? 
      <div className='profile__container'>
         <div className='profile__left'>
            <h1 className='font-3xl font-500 text-dark'>My Profile</h1>
            <div className='profile__left__img'>
               <img src={user.avatar.url} alt={user.name} />
            </div> 
            <div>
               <button className='btn-1' onClick={() => navigate('/updateProfile')}>Edit Profile</button>
            </div>
         </div>
         <div className='profile__right'>
            <div className='profile__right-1'>
               <h3 className='font-lg font-500'>Full Name</h3>
               <p className='text-muted font-sm'>{user.name}</p>
            </div>
            <div className='profile__right-2'>
               <h3 className='font-lg font-500'>Email</h3>
               <p className='text-muted font-sm'>{user.email}</p>
            </div>
            <div className='profile__right-3'>
               <h3 className='font-lg font-500'>Joined On</h3>
               <p className='text-muted font-sm'>{user.createdAt.substr(0,10)}</p>
            </div>
            <div className='profile__right-4'>
               <button onClick={() => navigate('/myOrders')}>My Orders</button>
               <button onClick={() => navigate('/update/password')}>Change Password</button>
            </div>
         </div>
      </div>
      : ''
   )
}

export default Profile