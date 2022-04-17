import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({redirectPath = '/login', children , admin = false}) => { 
   const { isAuthenticated , user } = useSelector(state => state.login);
      if(!admin){
         if ( isAuthenticated === false ) {
            return <Navigate to={redirectPath} replace />;
         }
         return children;

      }else if(admin){
         if( isAuthenticated === false){
            return <Navigate to={redirectPath} replace />
         }
         if(user && user.isAdmin === false){
            return <Navigate to='/' replace />
         }
         return children;
      }
 };
 export default ProtectedRoute;