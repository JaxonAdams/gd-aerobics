import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/images/logo.png';

const Header = () => {
    return (
        <header className='header'>
            <Link to='/'>
                <img className='header-logo' src={logo} alt='Gotta Dance Logo' />
            </Link>
        </header>
    );
};

export default Header;