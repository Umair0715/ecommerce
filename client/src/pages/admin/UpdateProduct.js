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
import { clearErrors, updateProduct , productDetails, addUpdateProductImages} from '../../redux/actions/productActions';
import { PRODUCT_IMAGES_RESET } from './../../redux/constants/productConstants'
import { useNavigate , useParams } from 'react-router-dom';
import Loader from '../../components/loader/Loader';

const UpdateProduct = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const alert = useAlert();
 
   const { loading : imagesLoading, error : imagesError , success : imagesSuccess } = useSelector((state) => state.productImages);
   const { loading : detailsLoading , error : detailsError , product } = useSelector(state => state.product);
   const {  loading : updateLoading , error : updateError } = useSelector(state => state.delUpdateProduct)
 
   const [name, setName] = useState('');
   const [price, setPrice] = useState();
   const [description, setDescription] = useState('');
   const [category, setCategory] = useState('');
   const [stock, setStock] = useState();
   const [images, setImages] = useState([]);
   const [oldImages , setOldImages] = useState([]);
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

      if (product && product._id !== id) {
         dispatch(productDetails(id));
       } 


      if(detailsError){
         alert.error(detailsError);
         dispatch(clearErrors());
      }
    
      if(imagesError){
         alert.error(imagesError);
         dispatch(clearErrors());
      }
      if(updateError){
         alert.error(updateError);
         dispatch(clearErrors());
      }
      if(imagesSuccess){
         alert.success('Product Updated Successfully.')
         dispatch({ type : PRODUCT_IMAGES_RESET})
         navigate('/admin/dashboard')
      }

 
   }, [dispatch , alert , imagesSuccess ,imagesError , navigate , detailsError , product , id  , updateError ]);

   useEffect(() => {
      if(product){
         setName(product.name);
         setStock(product.stock);
         setCategory(product.category);
         setDescription(product.description);
         setPrice(product.price);
         product && product.images && product.images.forEach(image => {
            setOldImages(old => [...old , image])
         })
      }
   }, [product])
 
   const updateSubmitHandler = async (e) => {
      e.preventDefault();
      const data = {
         name , 
         price ,
         description ,
         category ,
         stock , 
      }
      await dispatch(updateProduct(id , data));
      const formData = new FormData();
      images.forEach((image) => {
         formData.append('images' , image);
      });
      dispatch(addUpdateProductImages(id , formData))
   };
 
   const createProductImagesChange = (e) => {
      const files = Array.from(e.target.files);
 
      setImagesPreview([]);
      setImages([]);
      files.forEach((file) => {
         setImages(old => [...old , file])
         const reader = new FileReader();
   
         reader.onload = () => {
            if (reader.readyState === 2) {
            setImagesPreview((old) => [...old, reader.result]);
            setOldImages([]);
            }
         };
 
         reader.readAsDataURL(file);
      });
   };
 
   return (
      detailsLoading ? <Loader />
      :
      <>
         <div className="createProduct__container">
         <DashboardMenu />
         <div className="createProduct__form__container">
         <form
            className="createProductForm"
            onSubmit={updateSubmitHandler}
         >
            <h1 className='font-xl font-500 text-dark text-center'>Update Product</h1>

            <div>
               <SpellcheckIcon />
               <input
               type="text"
               placeholder="Product Name"
               value={name}
               onChange={(e) => setName(e.target.value)}
               />
            </div>
            <div>
               <AttachMoneyIcon />
               <input
               type="number"
               placeholder="Price"
               value={price}
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
               ></textarea>
            </div>

            <div>
               <AccountTreeIcon />
               <select value={category} onChange={(e) => setCategory(e.target.value)} >
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
               
               value={stock}
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
               
               />
            </div>

            <div id="createProductFormImage">
               {
               oldImages.map((image, index) => (
               <img key={index} src={image.url} alt="Product Preview" />
               ))}
            </div>

            <div id="createProductFormImage">
               {imagesPreview.map((image, index) => (
                  <img key={index} src={image} alt="Product Preview" />
               ))}
            </div>

            <Button
               id="createProductBtn"
               type="submit"
               disabled={imagesLoading || updateLoading ? true : false}
            >
               { imagesLoading || updateLoading ? 'Updating...' : 'Update'}
            </Button>
         </form>
         </div>
         </div>
      </>
   )
}

export default UpdateProduct