import { useEffect } from 'react';
import DashboardMenu from './../../components/dashboard/DashboardMenu';
import { useDispatch , useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import {getAdminProducts , clearErrors, deleteProduct} from './../../redux/actions/productActions';
import Loader from './../../components/loader/Loader'
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Pagination from './../../components/pagination/Pagination';
import { useNavigate, useParams } from 'react-router-dom';
import { DELETE_PRODUCT_RESET } from '../../redux/constants/productConstants';


const AllProducts = () => {
   const navigate = useNavigate();
   const alert = useAlert();
   const dispatch = useDispatch();
   const { pageNumber } = useParams() || 1;
   const { error , loading , products , pages , page} = useSelector(state => state.products);
   const { error : delError , loading : delLoading , isDeleted } = useSelector(state => state.delUpdateProduct)

   const deleteProductHandler = id => {
      dispatch(deleteProduct(id))
   }

   useEffect(() => {
      if(error){
         alert.error(error);
         dispatch(clearErrors())
      }
      if(delError){
         alert.error(delError);
         dispatch(clearErrors());
      }
      if(isDeleted){
         alert.success('Product Deleted Successfully.');
         dispatch({ type : DELETE_PRODUCT_RESET })
      }
      dispatch(getAdminProducts(pageNumber))
   }, [dispatch , alert , error , pageNumber , delError , isDeleted ])

   return (
      <div className='admin__products'>
         <DashboardMenu />
         <div className='admin__products__container'>
            <h3 className='font-xl font-500 text-dark text-center'>All Products</h3>
            {delLoading && <Loader /> }
            <div className='admin__products__table'>
            {
               loading ? <Loader />
               :
               products && products.length > 0 ? 
               <div className=''>
                 <table>
                    <thead>
                        <tr>
                           <th scope='col'>Product ID</th>
                           <th scope='col'>Name</th>
                           <th scope='col'>Stock</th>
                           <th scope='col'>Price</th>
                           <th scope='col'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                          products.map(product => (
                             <tr key={product._id}>
                                <td data-label='Product ID'>{product._id}</td>
                                <td data-label='Name'
                                >{product.name}</td>
                                <td data-label='Stock'>{product.stock}</td>
                                <td data-label='Price'>PKR: {product.price}</td>
                                <td data-label='Action' className='text-main pointer  '>
                                    <EditIcon 
                                    style={{color: 'green' , marginRight: '1rem'}} 
                                    onClick={() => navigate(`/admin/product/update/${product._id}`)}
                                    />

                                    <DeleteIcon 
                                    title='Delete Product' 
                                    onClick={() => deleteProductHandler(product._id)}
                                    />
                                </td>
                             </tr>
                          ))
                       }
                    </tbody>
                 </table>
              </div>
              : <h3 className='text-error'>No Product Found.</h3>
            }
            </div>
            <Pagination pages={pages} page={page} admin={true}/>
         </div>
      </div>
   )
}

export default AllProducts