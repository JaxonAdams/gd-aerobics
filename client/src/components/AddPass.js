import React, { useState } from 'react';
import axios from 'axios';

const AddPass = () => {
    const [formState, setFormState] = useState({ name: '', passType: '', expirationDate: '', punches: '' });

    const handleChange = e => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();

        let expDate;

        if (formState.passType === 'Regular') {
            let date = new Date();
            date = date.toISOString().split('T')[0];

            let nextYear = parseInt(date.split('-')[0]);
            nextYear++;
            const month = date.split('-')[1];
            const day = date.split('-')[2];

            const newDate = [nextYear, month, day].join('-');

            expDate = newDate;
        } else {
            expDate = formState.expirationDate;
        };

        if (formState.punches) {
            const punchesInt = parseInt(formState.punches);

            setFormState({ ...formState, punches: punchesInt });
        };

        // console.log({ ...formState, expirationDate: expDate });

        if (formState.name && formState.passType !== 'Pass Type') {
            axios.post('/api/passes', { ...formState, expirationDate: expDate })
            .then(() => {
                window.location.reload();
            });
        };
    };

    return (
        <form className='add-pass-form' onSubmit={handleSubmit}>
            <h2>Add A Punch Pass</h2>
            <div>
                <select className='txt-input' name='passType' defaultValue={formState.passType}  onChange={handleChange}>
                    <option>Pass Type</option>
                    <option>Regular</option>
                    <option>Unlimited</option>
                </select>
            </div>
            <input className='txt-input' type='text' name='name' placeholder='Name...' defaultValue={formState.name} onChange={handleChange} />
            {formState.passType === 'Unlimited' ?
                <div>
                    <label htmlFor='expirationDate'>Expiration Date: </label>
                    <input className='txt-input' type='date' name='expirationDate' defaultValue={formState.expirationDate}  onChange={handleChange} />
                </div> :
                <p>Expiration date for regular passes automatically set.</p>
            }
            <input className='txt-input' type='number' name='punches' placeholder='Starting Punches' defaultValue={formState.punches} onChange={handleChange} />
            <button type='submit' className='form-btn add-form-btn'>Submit</button>
        </form>
    );
};

export default AddPass;