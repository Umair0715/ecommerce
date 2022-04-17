import React, { Fragment, useRef, useState, useEffect } from "react";
import "./AuthForms.css";
import Loader from "../loader/Loader";
import { Link , useNavigate , useLocation } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register , addAvatar} from "../../redux/actions/userActions";
import { useAlert } from "react-alert";

const AuthForms = () => {
  const location= useLocation();
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  
  const { error, loading, isAuthenticated  } = useSelector(state => state.login);
  const { error : registerError , loading : registerLoading  } = useSelector(state => state.register);
  const { loading : avatarLoading } = useSelector(state => state.avatar)

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [name , setName] = useState("");
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLIbLTGKz4waJGU2vkbhQkRavjf2OdeY7Eo4l8yFnggdF3fX1bUF4FEUP13o34ioSCm-M&usqp=CAU");
  const [avatar, setAvatar] = useState();
  
  
  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword , navigate));
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    await dispatch(register({ name , email , password }))

    if(avatar){
      const formData = new FormData();
      formData.append("avatar", avatar);
      await dispatch(addAvatar(formData , navigate))
      navigate('/profile');
    }else{
      navigate('/')
    }
  };
  const redirect = location.search ? location.search.split("=")[1] : "/profile";
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if(registerError){
      alert.error(registerError)
      dispatch(clearErrors());
    }

    if (isAuthenticated === true) {
      if(redirect === 'shipping'){
        return navigate('/shipping')
      }
      navigate(redirect);
    }
  }, [dispatch, error, alert ,navigate , isAuthenticated , location.search, redirect ,registerError]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };
//   temp

const registerDataChange = (e) => {
        setAvatar(e.target.files[0])
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setAvatarPreview(reader.result);
          }
        }
        reader.readAsDataURL(e.target.files[0]);
   
};
  
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <Link to="/password/forgot"
                style={{ fontSize : '1.4rem' , fontFamily : 'sans-serif'}}>Forget Password ?</Link>
                <button type="submit" className="loginBtn" >
                  { loading ? 'Loading...' : 'Login'}
                </button>
              </form>

              {/**************** REGISTER FORM *****************/}
                <form
                  className="signUpForm"
                  ref={registerTab}
                  onSubmit={registerSubmit}
                >
                  <div className="signUpName">
                    <FaceIcon />
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="signUpEmail">
                    <MailOutlineIcon />
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="signUpPassword">
                    <LockOpenIcon />
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div id="registerImage">
                    <img src={avatarPreview} alt="Avatar Preview" />
                    <input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={registerDataChange}
                    />
                  </div>
                  <button type="submit" className="signUpBtn mt-20">
                    {registerLoading || avatarLoading ? 'Please Wait...' : 'Register'}
                  </button>
                </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default AuthForms;