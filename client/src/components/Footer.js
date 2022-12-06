import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Footer = ({ passList }) => {
    const [passCount, setPassCount] = useState({});

    useEffect(() => {
        axios.get('/api/passes/info/count')
        .then(dbPassData => setPassCount(dbPassData.data));
    }, []);

    return (
        <footer className='footer'>
            <h2 className='footer-txt'>Gotta Dance 2022</h2>
            <p className='footer-txt pass-count'>Logged: {passCount.regular} Regular ~ {passCount.unlimited} Unlimited</p>
        </footer>
    );
};

export default Footer;