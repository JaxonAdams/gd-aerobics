import React, { useState } from 'react';
import axios from 'axios';

const AddPass = () => {
    const [formState, setFormState] = useState({ name: '', passType: '', expirationDate: '' });

    const handleChange = e => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();

        axios.post('/api/passes', formState)
        .then(() => {
            window.location.reload();
        });
    };

    return (
        <form className='add-pass-form' onSubmit={handleSubmit}>
            <h2>Add A Punch Pass</h2>
            <input className='txt-input' type='text' name='name' placeholder='Name...' defaultValue={formState.name} onChange={handleChange} />
            <div>
                <label htmlFor='passType'>Pass Type: </label>
                <select className='txt-input' name='passType' defaultValue={formState.passType}  onChange={handleChange}>
                    <option>Regular</option>
                    <option>Unlimited</option>
                </select>
            </div>
            {formState.passType === 'Unlimited' ? 
                <div>
                    <label htmlFor='expirationDate'>Expiration Date: </label>
                    <input className='txt-input' type='date' name='expirationDate' defaultValue={formState.expirationDate}  onChange={handleChange} />
                </div>
            : ''}
            <button type='submit' className='form-btn add-form-btn'>Submit</button>
        </form>
    );
};

export default AddPass;