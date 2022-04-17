import React, { Fragment, useEffect , useState } from "react";
import {  useNavigate } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updateUser , loadUser, updateAvatar} from "./../redux/actions/userActions";
import { useAlert } from "react-alert";

const UpdateProfile = ({ user }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading : avatarLoading , error : avatarError} = useSelector(state => state.avatar)
  const { loading  , error } = useSelector(state => state.updateUser)

  const [name , setName] = useState("");
  const [email , setEmail] = useState("");

  const [avatar, setAvatar] = useState();

  const updateSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateUser({ name , email }))

    if(avatar){
      const formData = new FormData();
      formData.append("avatar", avatar);
      await dispatch(updateAvatar(formData , user._id ));
      dispatch(loadUser());
      alert.success('User updated successfully')
      navigate('/profile');
    }else{
      dispatch(loadUser())
      alert.success('user updated successfully')
      navigate('/profile')
    }
  };
 
   useEffect(() => {
      if(user){
         setName(user.name);
         setEmail(user.email);
      }
      if (error) {
         alert.error(error);
         dispatch(clearErrors());
      }
      if(avatarError){
         alert.error(avatarError);
         dispatch(clearErrors());
      }
   }, [dispatch, error, alert , avatarError , user ]);

  
   return (
      <Fragment>
         <div className="updateProfile__container">
            <div className="updateProfile">
               <h1 className="section__heading text-muted">Update Profile</h1>

               {/**************** REGISTER FORM *****************/}
               <form
                  className="updateForm"
                  onSubmit={updateSubmit}
               >
                  <div className="updateName">
                  <FaceIcon style={{fontSize : 18}}/>
                  <input
                     type="text"
                     placeholder="Name"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                  />
                  </div>
                  <div className="updateEmail">
                  <MailOutlineIcon  style={{fontSize: 18}}/>
                  <input
                     type="email"
                     placeholder="Email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                  />
                  </div>

                  <div id="registerImage" className='updateImage'>
                  <input
                     type="file"
                     name="avatar"
                     accept="image/*"
                     onChange={(e) => setAvatar(e.target.files[0])}
                  />
                  </div>
                  <button type="submit" className="signUpBtn mt-20">
                  {loading || avatarLoading ? 'Updating User...' : 'Update'}
                  </button>
               </form>
            </div>
         </div>
      </Fragment>
   );
};

export default UpdateProfile;