import './Pagination.css';
import { Link } from 'react-router-dom';


const Pagination = ({ pages , page , keyword='' , admin=false}) => {
   return (
      pages > 1 &&
      <div className='pagination'>
         {
            [...Array(pages).keys()].map(x => (
               <Link key={x+1} 
               className={ x+1 === page ? 'active' : ''}
               to={
                  !admin ?
                     keyword 
                        ? `/products/search/${keyword}/page/${x+1}` 
                        : `/products/page/${x+1}`
                  :
                  `/admin/products/page/${x+1}`
                  }>
                  <span>{x+1}</span>
               </Link>
            ))
         }
      </div>
   )
}

export default Pagination