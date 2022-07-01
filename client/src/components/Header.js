import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/images/logo.png';
import auth from '../utils/auth';

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
            { auth.loggedIn() ? 
            <Link className='header-link' to='/staff-login'>Log In</Link> 
            :
            <p className='header-link' onClick={() => auth.logout()}>Logout</p>
            }
            <input onChange={handleChange} className='txt-input' type='text' name='name' placeholder='Search a name...' defaultValue={searchParam} />
        </header>
    );
};

export default Header;