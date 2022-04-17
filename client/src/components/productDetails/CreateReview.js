import './CreateReview.css';
import { useEffect, useState } from 'react'
import { useDispatch , useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearErrors , createReview } from './../../redux/actions/reviewActions';
import { CREATE_REVIEW_RESET } from '../../redux/constants/reviewConstants';
import { productDetails } from '../../redux/actions/productActions';

const CreateReview = ({product , reviewForm , setReviewForm}) => {
   const alert = useAlert();
   const dispatch = useDispatch();

   const { error , loading , success } = useSelector(state => state.newReview);
   const { user } = useSelector(state => state.login);

   const [rating , setRating ] = useState(1);
   const [review , setReview ] = useState('');


   const createReviewHandler = (e , product) => {
      e.preventDefault();
      dispatch(createReview({ rating , review , product }));
   }

   useEffect(() => {
      if(error){
         alert.error(error);
         dispatch(clearErrors())
      }
      if(success){
         alert.success('Review Submitted')
         dispatch(productDetails(product._id))
         setReviewForm(false);
         dispatch({ type : CREATE_REVIEW_RESET })
      }
   }, [dispatch , error , success , alert , setReviewForm , product._id])


   return (
         user && reviewForm ? 
         <div className='createReview'>
            <h3 className='font-lg font-500 text-dark mt-10'>
               CREATE REVIEW
            </h3>
            <form className='font-sm mt-20' onSubmit={(e) => createReviewHandler( e , product._id)}>
               <div className='flex flex-col'>
                  <label className='font-base font-500 text-dark'>Rating</label>
                  <select  className='mt-10' value={rating} onChange={(e) => setRating(e.target.value)}>
                     <option value={1}>1 very poor</option>
                     <option value={2}>2 poor</option>
                     <option value={3}>3 good</option>
                     <option value={4}>4 very good</option>
                     <option value={5}>5 excellent</option>
                  </select>
               </div>
               <div className='mt-10 flex flex-col'>
                  <label className='font-base font-500 text-dark'>
                     Comment
                  </label>
                  <textarea className='font-sm mt-10 p-10' value={review}
                  onChange={(e) => setReview(e.target.value)}>
                  </textarea>
               </div>
               <div className='mt-20'>
                  <button className='btn btn-primary'>{loading ? 'Wait...' : 'Submit'}</button>
               </div>
               <div className='font-sm mt-10'>
                  <span><strong>NOTE:</strong> You can create one review for one product if you create more than one your previous review will be overwrite.</span>
               </div>
            </form>
         </div>
         : ' '
      
   )
}

export default CreateReview