import { Link } from 'react-router-dom';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line  , Doughnut} from 'react-chartjs-2'
import { useDispatch , useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { useEffect } from 'react';
import Loader from '../loader/Loader';
import { getAllAdminProducts , clearErrors} from './../../redux/actions/productActions';
import { getAllOrders , clearErrors as clearOrderErrors } from '../../redux/actions/orderActions';
import { getAllUsers , clearErrors as clearUserErrors} from '../../redux/actions/userActions';

const DashboardContent = () => {
   ChartJS.register(...registerables);
   const alert = useAlert();
   const dispatch = useDispatch();
   const { error , loading , products} = useSelector(state => state.adminProducts)
   const { error : orderError , loading : orderLoading , orders } = useSelector(state => state.allOrders);
   const { error : userError , loading : userLoading , users } = useSelector(state => state.allUsers);

   useEffect(() => {
      if(error){
         alert.error(error);
         dispatch(clearErrors());
      }
      if(userError){
         alert.error(userError);
         dispatch(clearUserErrors())
      }
      if(orderError){
         alert.error(orderError);
         dispatch(clearOrderErrors())
      }
      dispatch(getAllAdminProducts());
      dispatch(getAllOrders());
      dispatch(getAllUsers());

   }, [dispatch , error , alert , orderError , userError ])

   let earnedAmount;
   if(orders){
      earnedAmount = orders.reduce((acc , order) => acc + order.totalPrice , 0)
   }

   const lineState = {
      labels: ["Initial Amount", "Amount Earned"],
      datasets: [
         {
            label: "TOTAL AMOUNT",
            backgroundColor: ["tomato"],
            hoverBackgroundColor: ["rgb(197, 72, 49)"],
            data: [0, earnedAmount],
         },
      ],
    };
    
   let outOfStock = 0;
   products && products.forEach(pro => {
      if(pro.stock === 0){
         outOfStock += 1;
      }
   })

   const doughnutState = {
      labels: ["Out of Stock", "InStock"],
      datasets: [
         {
            backgroundColor: ["#00A6B4", "#6800B4"],
            hoverBackgroundColor: ["#4B5000", "#35014F"],
            data: [outOfStock , products && products.length - outOfStock],
         },
      ],
   };

   return (
      loading || orderLoading || userLoading ? <Loader />
      : 
      <div className='dash__content__container'>
         <div className='dash__content'>
            <h3 className='font-xl font-500 text-dark text-center'>Dashboard</h3>
            <div className='dash__totalAmount'>
               <p>Total Amount</p>
               <p>PKR {earnedAmount}</p>
            </div>
            <div className='dash__details'>
               <Link to='/admin/products'>
                  <p>Products</p>
                  <p>{products ? products.length : ''}</p>
               </Link>
               <Link to='/admin/orders'>
                  <p>Orders</p>
                  <p>{orders && orders.length}</p>
               </Link>
               <Link to='/admin/users'>
                  <p>Users</p>
                  <p>{users && users.length }</p>
               </Link>
            </div>
            <div className='lineChart'>
               <Line data={lineState} />
            </div>
            <div className='doughnutChart'>
               <Doughnut data={doughnutState} />
            </div>
         </div>
      </div>
   )
}

export default DashboardContent