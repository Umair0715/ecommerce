import React from 'react';
import './Footer.css'


const Footer = () => {
    return (
        <div className='footer '>
            <div className='container flex items-center justify-between'>
                <div className='left'>
                    <h3 className='footer_heading'>DOWNLOAD OUR APP</h3>
                    <p>Download App for Android and IOS mobile phones</p>    
                    <div className='left__images flex items-center justify-center flex-col'>
                        <img src='/images/google1.png' alt='img' />    
                    </div>       
                </div>
                <div className='middle text-center'>
                    <h1 className='logo_heading'>ECOMMERCE</h1>
                    <p>Hight Quality is our first priority.</p>
                    <p>Copyright 2022 <span>&copy;</span> By Web Gallery(Umair)</p>
                </div>
                <div className='right text-center '>
                    <h3 className='footer_heading'>Follow us</h3>
                    <p>instagram</p>
                    <p>Facebook</p>
                    <p>youtube</p>
                </div>
            </div>
        </div>
    )
};

export default Footer;
