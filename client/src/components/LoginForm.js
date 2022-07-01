import React, { useState } from 'react';
import axios from 'axios';

import auth from '../utils/auth';

const LoginForm = () => {
    const [formState, setFormState] = useState({ email: '', password: '' });

    const handleChange = e => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();

        axios.post('/api/users/login', formState)
        .then(response => {
            const token = response.data.token;
            setFormState({ email: '', password: '' });
            auth.login(token);
        });
    };

    return (
        <div className='form-container'>
            <form className='login-form' onSubmit={handleSubmit}>
                <h2>Staff Login</h2>
                <input type='email' name='email' onChange={handleChange} defaultValue={formState.email} className='txt-input' placeholder='Email...' />
                <input type='password' name='password' onChange={handleChange} defaultValue={formState.password} className='txt-input' placeholder='Password...' />
                <button type='submit' className='form-btn'>Submit</button>
            </form>
        </div>
    );
};

export default LoginForm;