import React from 'react';
import { Link } from 'react-router-dom';
import { App, Check2Square } from 'react-bootstrap-icons';

import logo from '../assets/images/logo.png';
import auth from '../utils/auth';

const Header = ({ searchParam, setSearchParam, filterExpPass, setFilterExpPass }) => {
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
            <div className='header-container'>
                <input onChange={handleChange} className='txt-input searchbar' type='text' name='name' placeholder='Search a name...' defaultValue={searchParam} />
                <p className='filter-txt' onClick={() => setFilterExpPass(!filterExpPass)}>
                    <span>
                        {filterExpPass ?
                        <Check2Square /> :
                        <App />}
                    </span>
                Only Expired Passes</p>
            </div>
        </header>
    );
};

export default Header;