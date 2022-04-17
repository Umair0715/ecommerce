import './Admin.css';
import DashboardMenu from './../../components/dashboard/DashboardMenu'
import DashboardContent from './../../components/dashboard/DashboardContent'

const Dashboard = () => {
   return (
      <div className='dashboard__container'>
         <DashboardMenu />
         <DashboardContent />
      </div>
   )
}

export default Dashboard