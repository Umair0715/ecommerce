import { useEffect , useState } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import Loader from './../components/loader/Loader';
import { getProducts } from './../redux/actions/productActions';
import Product from '../components/home/products/Product';
import { useParams , useNavigate } from 'react-router-dom';
import Pagination from '../components/pagination/Pagination';
import { Typography , Slider} from '@material-ui/core'


const categories = ['Wearing' , 'Bottom' , 'Laptops' , 'Phones' , 'Electronics' , 'Cosmetics' , 'Cameras' , 'Gaming'];


const ProductsPage = () => {
   const [price , setPrice] = useState([0,500000]);
   const [rating, setRating] = useState(0);
   const [category , setCategory] = useState('');
   const navigate = useNavigate();
   const { keyword } = useParams();
   const { pageNumber } = useParams() || 1;
   const dispatch = useDispatch();
   const { products , loading , pages , page } = useSelector(state => state.products);
   
   useEffect(() => {
      dispatch(getProducts(keyword, pageNumber , price , rating , category));
   }, [dispatch , keyword , pageNumber , price , rating , category])

   const priceFilterHanlder = ( e , newPrice) => {
      setPrice(newPrice);
   }

   return (
      <div className='productsPage w-70 m-auto py-50'>
         <div className='goBack py-30'>
            <button className='btn btn-primary' onClick={() => navigate(-1)}>
               Go Back
            </button>
         </div>
         <h1 className='section__heading'>Products</h1>
         {
            loading ? <Loader />
            : 
            <div className='products'>
               {
                  products && products.length > 0 ?
                  products.map(product => {
                     return <Product product={product}  key={product._id}/>
                  })
                  : <h1>Product not found.</h1>
               }
            </div>
         }
         <div className='filter__container'>
            <div className='price__filter'>
               <Typography id="range-slider" gutterBottom>
                  Price
               </Typography>
               <Slider
               value={price}
               onChange={priceFilterHanlder}
               valueLabelDisplay="auto"
               aria-labelledby="range-slider"
               min={0}
               max={500000}
               />
            </div>
            <div className='category__filter my-10'>
               <ul>
                  {
                     categories.map(categoryItem => (
                        <li key={categoryItem} className={`category__items
                        ${categoryItem === category ? 'active' : ''} `}
                        onClick={() => setCategory(categoryItem)}>
                           {categoryItem}
                        </li>
                     ))
                  }
                  <li className='category__item'
                  onClick={() => { navigate('/products'); setCategory('') } }
                  >All Products</li>
               </ul>
            </div>

            <div className='rating__filter'>
            <fieldset>
               <Typography component="legend">Ratings Above</Typography>
               <Slider
               value={rating}
               onChange={(e, rating) => setRating(rating)}
               valueLabelDisplay="auto"
               aria-labelledby="range-slider"
               min={0}
               max={5}
               // getAriaValueText={valuetext}
               />
            </fieldset>
            </div>
         </div>
       
         <Pagination pages={pages} page={page} keyword={keyword}/>
      </div>
   )
}

export default ProductsPage   