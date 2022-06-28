import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PassList = () => {
    const [passList, setPassList] = useState([]);

    useEffect(() => {
        axios.get('/api/passes')
        .then(response => setPassList(response.data));
    });

    return (
        <div className='pass-list-container'>
            <h1 className='list-title'>Aerobics Punch Passes</h1>
            <div className='pass-list'>
                {passList.map(pass => (
                    <div className='pass' key={pass._id}>
                        <p>{pass.name}</p>
                        <div>
                            <p>{pass.punches} Punches</p>
                            <p>Pass Type: {pass.passType}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PassList;