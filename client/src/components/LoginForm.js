import React, { useState } from 'react';

import auth from '../utils/auth';

const LoginForm = () => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = e => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();

        // axios.post('/api/users/login', formState)
        // .then(response => {
        //     const token = response.data.token;
        //     setFormState({ email: '', password: '' });
        //     auth.login(token);
        // });

        const postRequest = async () => {
            try {
                const response = await fetch('/api/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json'
                    },
                    body: JSON.stringify(formState)
                });

                if (!response.ok) {
                    if (response.status === 404) {
                        setErrorMessage('Email not found.');
                    } else if (response.status === 403) {
                        setErrorMessage('Incorrect password.');
                    };
                };

                const data = await response.json();

                const token = data.token;
                setFormState({ email: '', password: '' });
                setErrorMessage('');
                auth.login(token);
            } catch (e) {};
        };

        postRequest();
    };

    return (
        <div className='form-container'>
            <form className='login-form' onSubmit={handleSubmit}>
                <h2>Staff Login</h2>
                <input type='email' name='email' onChange={handleChange} defaultValue={formState.email} className='txt-input' placeholder='Email...' />
                <input type='password' name='password' onChange={handleChange} defaultValue={formState.password} className='txt-input' placeholder='Password...' />
                <button type='submit' className='form-btn'>Submit</button>
                {errorMessage && <p className='error-message'>{errorMessage}</p>}
            </form>
        </div>
    );
};

export default LoginForm;
