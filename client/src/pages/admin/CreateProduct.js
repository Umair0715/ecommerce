import './Admin.css';
import { useState , useEffect } from 'react';
import DashboardMenu from '../../components/dashboard/DashboardMenu';
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { clearErrors, createProduct } from '../../redux/actions/productActions';
import { addProductImages } from '../../redux/actions/productActions';
import { PRODUCT_IMAGES_RESET } from './../../redux/constants/productConstants'
import { useNavigate  } from 'react-router-dom';

const CreateProduct = () => {
    const navigate = useNavigate();
   const dispatch = useDispatch();
   const alert = useAlert();
 
   const { loading, error } = useSelector((state) => state.newProduct);
   const { loading : imagesLoading, error : imagesError , success : imagesSuccess } = useSelector((state) => state.productImages);
 
   const [name, setName] = useState("");
   const [price, setPrice] = useState(0);
   const [description, setDescription] = useState("");
   const [category, setCategory] = useState("");
   const [stock, setStock] = useState(0);
   const [images, setImages] = useState([]);
   const [imagesPreview, setImagesPreview] = useState([]);
 
   const categories = [
      'Wearing' , 
      'Bottom' , 
      'Laptops' , 
      'Phones' , 
      'Electronics' , 
      'Cosmetics' , 
      'Cameras' ,
      'Gaming'
   ];
 
   useEffect(() => {
      if(error){
         alert.error(error);
         dispatch(clearErrors())
      }
      if(imagesError){
         alert.error(imagesError);
         dispatch(clearErrors());
      }
      if(imagesSuccess){
         alert.success('Product Created Successfully.')
         dispatch({ type : PRODUCT_IMAGES_RESET})
         navigate('/admin/dashboard')
      }
 
   }, [dispatch , alert , error , imagesSuccess ,imagesError , navigate]);
 
   const createProductSubmitHandler = async (e) => {
      e.preventDefault();
      const data = {
         name , 
         price ,
         description ,
         category ,
         stock 
      }
      await dispatch(createProduct(data));
      if(!error){
         const formData = new FormData();
         images.forEach((image) => {
            formData.append('images' , image);
         });
         dispatch(addProductImages(formData))
      }
   };
 
   const createProductImagesChange = (e) => {
      const files = Array.from(e.target.files);
 
      setImagesPreview([]);
      files.forEach((file) => {
         setImages(old => [...old , file])
         const reader = new FileReader();
   
         reader.onload = () => {
            if (reader.readyState === 2) {
            setImagesPreview((old) => [...old, reader.result]);
            }
         };
 
         reader.readAsDataURL(file);
      });
   };
 
   return (
     <>
       <div className="createProduct__container">
         <DashboardMenu />
         <div className="createProduct__form__container">
           <form
             className="createProductForm"
             onSubmit={createProductSubmitHandler}
           >
             <h1 className='font-xl font-500 text-dark text-center'>Create Product</h1>
 
             <div>
               <SpellcheckIcon />
               <input
                 type="text"
                 placeholder="Product Name"
                 required
                 value={name}
                 onChange={(e) => setName(e.target.value)}
               />
             </div>
             <div>
               <AttachMoneyIcon />
               <input
                 type="number"
                 placeholder="Price"
                 required
                 onChange={(e) => setPrice(e.target.value)}
               />
             </div>
 
             <div>
               <DescriptionIcon />
 
               <textarea
                 placeholder="Product Description"
                 value={description}
                 onChange={(e) => setDescription(e.target.value)}
                 cols="30"
                 rows="1"
                 required
               ></textarea>
             </div>
 
             <div>
               <AccountTreeIcon />
               <select onChange={(e) => setCategory(e.target.value)} required>
                 <option value="">Choose Category</option>
                 {categories.map((cate) => (
                   <option key={cate} value={cate}>
                     {cate}
                   </option>
                 ))}
               </select>
             </div>
 
             <div>
               <StorageIcon />
               <input
                 type="number"
                 placeholder="Stock"
                 required
                 onChange={(e) => setStock(e.target.value)}
               />
             </div>
 
             <div id="createProductFormFile">
               <input
                 type="file"
                 name="avatar"
                 accept="image/*"
                 onChange={createProductImagesChange}
                 multiple
                 required
               />
             </div>
 
             <div id="createProductFormImage">
               {imagesPreview.map((image, index) => (
                 <img key={index} src={image} alt="Product Preview" />
               ))}
             </div>
 
             <Button
               id="createProductBtn"
               type="submit"
               disabled={loading || imagesLoading ? true : false}
             >
               {loading || imagesLoading ? 'Creating...' : 'Create'}
             </Button>
           </form>
         </div>
       </div>
     </>
   )
}

export default CreateProduct