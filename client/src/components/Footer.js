import React from 'react';

const Footer = ({ passList }) => {
    return (
        <footer className='footer'>
            <h2 className='footer-txt'>Gotta Dance 2022</h2>
            <p className='footer-txt pass-count'>{passList.length} Passes Logged</p>
        </footer>
    );
};

export default Footer;