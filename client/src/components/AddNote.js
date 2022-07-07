import React, { useState } from 'react';
import axios from 'axios';

const AddNote = () => {
    const [formState, setFormState] = useState({ name: '', passType: '', note: '' });

    const handleChange = e => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        console.log(formState);

        if (formState.name && formState.passType !== 'Pass Type') {
            axios.put('/api/passes/note', formState)
            .then(() => {
                window.location.reload();
            });
        };
    };

    return (
        <form className='add-pass-form' onSubmit={handleSubmit}>
            <h2>Add A Note</h2>
            <input className='txt-input' type='text' name='name' placeholder="Name..." defaultValue={formState.name} onChange={handleChange} />
            <div>
                <select className='txt-input' name='passType' defaultValue={formState.passType} onChange={handleChange}>
                    <option>Pass Type</option>
                    <option>Regular</option>
                    <option>Unlimited</option>
                </select>
            </div>
            <input className='txt-input' type='text' name='note' placeholder="Note..." defaultValue={formState.note} onChange={handleChange} />
            <button type='submit' className='form-btn add-form-btn'>Submit</button>
        </form>
    );
};

export default AddNote;