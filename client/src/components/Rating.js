import ReactStars from 'react-rating-stars-component';


const Rating = ( { rating }) => {

   const options = {
      edit : false ,
      color: 'rgba(20,20,20,0.1)',
      activeColor: 'tomato' ,
      size : window.innerWidth < 600 ? 20 : 25,
      value : rating  ,
      isHalf : true 
   }
   return (
      <ReactStars {...options} />
   )
}

export default Rating