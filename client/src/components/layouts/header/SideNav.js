import './SideNav.css';
import { Link } from 'react-router-dom';



const SideNav = ({ show , setShow}) => {
    return (
        <div className={`sideNav ${show ? 'show' : ''} `}>
            <div className='nav__close flex items-center justify-between'>
                <h1 className='font-xl text-main'>ECOMMERCE</h1>
                <i className="fa-solid fa-xmark font-3xl" onClick={() => setShow(false)}></i>
            </div>
            <div className='nav__logo my-20 font-lg text-center text-main'>
               
            </div>
            <ul className='nav__menu flex flex-col items-center justify-center'>
               <li><Link to='/'>Home</Link></li>
               <li><Link to='/about'>About</Link></li>
               <li><Link to='/products'>Products</Link></li>
               <li><Link to='/contact'>Contact</Link></li>
            </ul>
            <div className='nav__icons'>
                <Link to='/profile' >
                    <i className="fa-solid fa-circle-user " title='Profile'></i>
                </Link>
                <Link to='/cart'>
                    <i className="fa-solid fa-bag-shopping" title='Cart'></i>
                </Link>
                <Link to='/search'>
                    <i className="fa-solid fa-magnifying-glass" title='Seacrh products'></i>
                </Link>
            </div>
        </div>
    )
};

export default SideNav;
