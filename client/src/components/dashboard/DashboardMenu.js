import './Dashboard.css';
import { Link } from 'react-router-dom';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import { TreeView, TreeItem } from "@material-ui/lab";
import RateReviewIcon from "@material-ui/icons/RateReview";


const DashboardMenu = () => {
   return (
      <div className='dash__menu'>
         <div className='dash__menu__logo text-center'>
            <Link to='/'>
               <h1>ECOMMERCE</h1>
            </Link>
         </div>
         <div className='dash__menu__list'>
            <Link to='/admin/dashboard'>
               <p>
                  <DashboardIcon />  Dashboard
               </p>
            </Link>
            <div className='mt-30' style={{background: 'none' , color: ' rgb(146, 146, 146)'}}>
               <TreeView
                  defaultCollapseIcon={<ExpandMoreIcon />}
                  defaultExpandIcon={<ImportExportIcon />}
               >
                  <TreeItem nodeId="1" label="Products">
                     <Link to="/admin/products">
                        <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
                     </Link>

                     <Link to="/admin/product/create">
                        <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
                     </Link>
                  </TreeItem>
               </TreeView>
            </div>
            <Link to='/admin/orders'>
               <p>
                  <ListAltIcon />  Orders
               </p>
            </Link>
            <Link to='/admin/users'>
               <p>
                  <PeopleIcon />  Users
               </p>
            </Link>
            <Link to='/admin/reviews'>
               <p>
                  <RateReviewIcon />  Reviews
               </p>
            </Link>
         </div>
      </div>
   )
}

export default DashboardMenu