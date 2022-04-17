import React from 'react'
import Hero from '../components/home/Hero/Hero'
import { useEffect  } from 'react'
import Product from '../components/home/products/Product';
import { useDispatch , useSelector } from 'react-redux';
import { getProducts , clearErrors } from './../redux/actions/productActions'
import { useAlert } from 'react-alert';
import Loader from '../components/loader/Loader';
import { useNavigate } from 'react-router-dom';

const Home = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const alert = useAlert();
   const { products , error , loading } = useSelector(state => state.products);
   useEffect(() => {
      if(error){
         alert.error(error);
         dispatch(clearErrors())
      }
      dispatch(getProducts())
   }, [dispatch , error , alert ])

   return (
      <div className='homeContainer'>
         <Hero />
         <div className='products__container w-80 m-auto' id='products'>
            <h1 className='section__heading text-center'>Feature Products</h1>
            {
               loading ? <Loader /> 
               : 
               <div className='products' >
                  {
                     products && products.length > 0 &&
                        products.map(product => (
                           <Product product={product} key={product._id}/>
                        ))
                  }
               </div>
            }
            <div className='my-30 text-center' style={{ padding: '5rem 0'}} >
               <button className='btn btn-primary' onClick={() => navigate('/products')}>Show All</button>
            </div>
         </div>
        
      </div>
   )
}

export default Home