import './Product.css';
import { Link } from 'react-router-dom';
import Rating from '../../Rating';


const Product = ({product}) => {
   
    return (
        <Link to={`/product/${product._id}`}>
            <div className='product__card'>
                <img src={product.images[0].url} alt='product'></img>
                <div className='product__info'>
                    <h3 className='product__name'>{product.name}</h3>
                    <div className='product__review flex items-center justify-between'>
                        <Rating rating={product.ratingsAvg} />
                        <p>({product.numOfReviews})</p>
                    </div>
                    <h3 className='product__price'>${product.price}</h3>
                </div>
            </div>
        </Link>
    )
};

export default Product;
