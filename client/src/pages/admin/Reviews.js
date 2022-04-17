import './Admin.css';
import React, { useEffect, useState } from 'react'
import { useSelector , useDispatch } from 'react-redux';
import DashboardMenu from '../../components/dashboard/DashboardMenu'
import { useAlert } from 'react-alert';
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import DeleteIcon from "@material-ui/icons/Delete";
import { getProductReviews , clearErrors, deleteReview } from './../../redux/actions/reviewActions';
import { DELETE_REVIEW_RESET } from '../../redux/constants/reviewConstants';
import Loader from '../../components/loader/Loader';

const Reviews = () => {
   const dispatch = useDispatch();
   const alert = useAlert();
   const [product , setProduct] = useState('');
   const { error , loading , reviews } = useSelector(state => state.reviews )
   const { loading : delLoading , error : delError , isDeleted } = useSelector(state => state.deleteReview);
  
   useEffect(() => {
      if(error){
         alert.error(error);
         dispatch(clearErrors())
      }
      if(delError){
         alert.error(delError);
         dispatch(clearErrors())
      }
      if(product.length === 24){
         dispatch(getProductReviews(product))
      }
      if(isDeleted){
         alert.success('Review Deleted Successfully.');
         dispatch({ type : DELETE_REVIEW_RESET })
         dispatch(getProductReviews(product))
      }

   }, [dispatch , alert , error , product , delError , isDeleted]);

   const deleteReviewHandler = id => {
      dispatch(deleteReview(id));
   }
   

   const reviewSubmit = e => {
      e.preventDefault();
      
   }

   return (
      <>
         <div className='updateUser__container'>
         <DashboardMenu />
         <div className='updateUserForm' style={{ display : 'flex' , flexDirection : 'column' , width: '100%'}}>
               <form onSubmit={reviewSubmit}>
               <h3 className='font-xl font-500 text-dark text-center'>Find Reviews</h3>
                  <div className='form__input'>
                     <SpellcheckIcon style={{fontSize : 18}}/>
                     <input 
                     placeholder='Enter Product id'
                     type='text' 
                     value={product}
                     onChange={(e) => setProduct(e.target.value) }
                     />
                  </div>
                  <div className='w-100 text-center py-30'>
                     <button type='submit' className='btn btn-primary '
                     style={{ width: '100%'}}
                     disabled={ loading ? true : false}
                     >{ loading ? 'Searching...' : 'Search'}</button>
                  </div>
               </form>

               {/* REVIEWS */}
               {
                  reviews && reviews.length > 0 ? 
                  <div className='' style={{ padding: '5rem 2rem' , width: '100%'}}>
                     {delLoading && <Loader />  }
                     <table>
                        <thead>
                           <tr>
                              <th scope='col'>Review ID</th>
                              <th scope='col'>User</th>
                              <th scope='col'>Comment</th>
                              <th scope='col'>Rating</th>
                              <th scope='col'>Action</th>
                           </tr>
                        </thead>
                        <tbody>
                           {
                              reviews && reviews.map(review => (
                                 <tr key={review._id}>
                                    <td data-label='Review ID'>{review._id}</td>
                                    <td data-label='User'
                                    >{review && review.user ? review.user.name : 'Removed'}</td>
                                    <td data-label='Comment'>{review.review}</td>
                                    <td data-label='Rating'>{review.rating}</td>
                                    <td data-label='Action' className='text-main pointer'>
                                          <DeleteIcon 
                                          title='Delete User' 
                                          onClick={() => deleteReviewHandler(review._id)}
                                          />
                                    </td>
                                 </tr>
                              ))
                           }
                        </tbody>
                     </table>
                  </div>
                  : 
                  <div className='w-100 flex items-center justify-center py-30'>
                     <h3 className='font-xl font-500 text-error'>No Review Found</h3>
                  </div>
               }
              
         </div>
          
      </div>
     
      </>
   )
}

export default Reviews