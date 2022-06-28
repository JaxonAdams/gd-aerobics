import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/images/logo.png';

const Header = ({ searchParam, setSearchParam }) => {
    const handleChange = e => {
        e.preventDefault();
        setSearchParam(e.target.value.toLowerCase());
    };

    return (
        <header className='header'>
            <Link to='/'>
                <img className='header-logo' src={logo} alt='Gotta Dance Logo' />
            </Link>
            <input onChange={handleChange} className='txt-input' type='text' name='name' placeholder='Search a name...' defaultValue={searchParam} />
        </header>
    );
};

export default Header;