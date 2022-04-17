import './App.css';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import Header from './components/layouts/header/Header';
import Footer from './components/layouts/footer/Footer';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import ProductsPage from './pages/ProductsPage';
import Search from './pages/Search';
import { useEffect, useState } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { loadUser } from './redux/actions/userActions';
import UserOptions from './components/layouts/header/UserOptions';
import Profile from './pages/Profile';
import UpdateProfile from './pages/UpdateProfile';
import Orders from './pages/Orders';
import ProtectedRoute from './ProtectedRoute';
import AuthForms from './components/auth/AuthForms';
import UpdatePassword from './components/auth/UpdatePassword';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import Cart from './pages/Cart';
import Shipping from './pages/Shipping';
import ConfirmOrder from './pages/ConfirmOrder';
import axios from 'axios';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from './pages/Payment';
import PaymentSuccess from './pages/PaymentSuccess';
import OrderDetails from './pages/OrderDetails';
import Dashboard from './pages/admin/Dashboard';
import AllProducts from './pages/admin/AllProducts';
import CreateProduct from './pages/admin/CreateProduct';
import UpdateProduct from './pages/admin/UpdateProduct';
import OrdersList from './pages/admin/OrdersList';
import UpdateOrder from './pages/admin/UpdateOrder';
import UsersList from './pages/admin/UsersList';
import UpdateUser from './pages/admin/UpdateUser';
import Reviews from './pages/admin/Reviews';
import NotFound from './components/notFound/NotFound';
import Contact from './components/contact/Contact';
import About from './components/about/About';

 

const App = () => {
   const dispatch = useDispatch();
   const [stripeApiKey , setStripeApiKey] = useState(null);

   async function getStripeKey () {
      const { data } = await axios.get('/api/v1/stripe/api_key');
      setStripeApiKey(data.stripeApiKey ? data.stripeApiKey : '');
   }
   
   useEffect(  () => {
      dispatch(loadUser());
      getStripeKey();
   }, [dispatch])
   
   const { user } = useSelector(state => state.login);
   return (
      <Router>
         {user ? <UserOptions user={user} /> : ''}
         <Header />
         <main className='min-h-100'>
            <Routes>
               <Route path='/' element={<Home />} />
               <Route path='/product/:id' element={<ProductDetails />} />
               <Route path='/products' element={<ProductsPage  />} />
               <Route path='/products/search/:keyword' element={<ProductsPage />} />
               <Route path='/products/page/:pageNumber' element={<ProductsPage />} />
               <Route path='/products/search/:keyword/page/:pageNumber' element={<ProductsPage />} />
               <Route path='/login' element={<AuthForms />} />
               <Route path='/search' element={<Search />} />
               <Route path='/password/forgot' element={<ForgotPassword />} />
               <Route path='/password/reset/:token' element={<ResetPassword />}/>
               <Route path='/cart' element={<Cart />} />
               <Route path='/updateProfile' 
               element={ 
                  <ProtectedRoute>
                     <UpdateProfile user={user}/>
                  </ProtectedRoute>} 
               />
               <Route path='/myOrders' 
               element={
                  <ProtectedRoute>
                     <Orders user={user}/>
                  </ProtectedRoute>} 
               />
               <Route path='/profile' 
               element={
                  <ProtectedRoute>
                     <Profile user={user} />
                  </ProtectedRoute>} 
               />
               <Route path='/update/Password' 
               element={
                  <ProtectedRoute>
                     <UpdatePassword user={user} />
                  </ProtectedRoute>} 
               />
               <Route path='/shipping' element={
                  <ProtectedRoute>
                     <Shipping />
                  </ProtectedRoute>
               } />
               <Route path='/confirmOrder' element={
                  <ProtectedRoute>
                     <ConfirmOrder />
                  </ProtectedRoute>
               } />
               <Route replace path='/success' element={
                  <ProtectedRoute>
                     <PaymentSuccess />
                  </ProtectedRoute>
               } />
               {
                  stripeApiKey && 
                  <Route path='/payment/process' element={
                     <ProtectedRoute>
                        <Elements stripe={loadStripe(stripeApiKey)}>
                           <Payment /> 
                        </Elements>
                     </ProtectedRoute>
                  } />
               }
               <Route path='/order/:id' element={
                  <ProtectedRoute>
                     <OrderDetails />
                  </ProtectedRoute>
               } />

               {/* ADMIN ROUTES */}
               <Route path='/admin/dashboard' element={
                  <ProtectedRoute admin={true}>
                     <Dashboard />
                  </ProtectedRoute>
               } />
               <Route path='/admin/products' element={
                  <ProtectedRoute admin={true}>
                     <AllProducts />
                  </ProtectedRoute>
               } />
                <Route path='/admin/products/page/:pageNumber' element={
                  <ProtectedRoute admin={true}>
                     <AllProducts />
                  </ProtectedRoute>
               } />
               <Route path='/admin/product/create' element={
                  <ProtectedRoute admin={true}>
                     <CreateProduct />
                  </ProtectedRoute>
               } />

               <Route path='/admin/product/update/:id' element={
                  <ProtectedRoute admin={true}>
                     <UpdateProduct />
                  </ProtectedRoute>
               } />

               <Route path='/admin/orders' element={
                  <ProtectedRoute admin={true}>
                     <OrdersList />
                  </ProtectedRoute>
               } />

               <Route path='/admin/order/update/:id' element={
                  <ProtectedRoute admin={true}>
                     <UpdateOrder />
                  </ProtectedRoute>
               } />

               <Route path='/admin/users' element={
                  <ProtectedRoute admin={true}>
                     <UsersList />
                  </ProtectedRoute>
               } />

               <Route path='/admin/user/update/:id' element={
                  <ProtectedRoute admin={true}>
                     <UpdateUser />
                  </ProtectedRoute>
               } />

               <Route path='/admin/reviews' element={
                  <ProtectedRoute admin={true}>
                     <Reviews />
                  </ProtectedRoute>
               } />

               <Route path='/contact' element={<Contact />} />
               <Route path='/about' element={<About />} />
               
               <Route path='*' element={<NotFound />} />

            </Routes>
            
         </main>
         <Footer />
      </Router>
   )
};

export default App;