import './Header.css';
import SideNav from './SideNav';
import { useState } from 'react';

const Header = () => {
    const [show, setShow] = useState(false);

    const handleToggle = () => {
        setShow(true);
    };
    return (
        <nav>
            <div className='container flex items-center justify-between'>
               <div className='menu'>
                  <i className="fa-solid fa-bars icon" onClick={handleToggle}></i>
                  <SideNav show={show} setShow={setShow} />
               </div>
              
            </div>
        </nav>
    )
};

export default Header;
