import './Reviews.css';
import Rating from './../Rating';

const Reviews = ({ product }) => {
   return (
      <div className='reviews__container'>
         <h3 className='section__heading text-dark'>Reviews</h3>
         {
            product.reviews && product.reviews.length > 0 ? 
            <div className='reviews'>
               {
                  product.reviews.map(review => (
                     <div className='review' key={review._id}>
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLIbLTGKz4waJGU2vkbhQkRavjf2OdeY7Eo4l8yFnggdF3fX1bUF4FEUP13o34ioSCm-M&usqp=CAU' alt='user'></img>
                        <h3 className='font-lg font-500 text-dark'>{review && review.user ? review.user.name  : "Removed"}</h3>
                        <Rating rating={review.rating} />
                        <p className='font-sm text-muted'>
                           {review.review}
                        </p>
                     </div> 
                  ))
               }
              
            </div>
            : <div className='w-80 m-auto' style={{ marginTop : '70px'}}>
               <h3 className='font-lg text-muted font-500'>No Review Found related to this product</h3>
            </div>
         }
        
      </div>
   )
}

export default Reviews  