import React, { useEffect, useState } from 'react';
import axios from 'axios';

import auth from '../utils/auth';

const PassList = ({ searchParam }) => {
    const [passList, setPassList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);

    useEffect(() => {
        axios.get('/api/passes')
        .then(response => {
            setPassList(response.data);
            if (!filteredList.length) {
                setFilteredList(response.data);
            };
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        let filteredList;

        filteredList = passList.filter(pass => {
            const passName = pass.name.toLowerCase();
            if (passName.includes(searchParam)) {
                return true;
            }
            return false;
        });

        setFilteredList(filteredList);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParam]);

    const handlePunch = passInfo => {
        axios.post(`/api/passes/${passInfo._id}/punch`)
        .then(() => {
            // TODO: look for way to update list after punch w/o reload
            window.location.reload();
        });
    };

    const handleRenew = passInfo => {
        axios.post(`/api/passes/${passInfo._id}/renew`)
        .then(() => {
            // TODO: look for way to update list after punch w/o reload
            window.location.reload();
        });
    };

    return (
        <div className='pass-list-container'>
            <h1 className='list-title'>Fitness Punch Passes</h1>
            <div className='pass-list'>
                {filteredList.map(pass => (
                    <div className={`pass ${pass.overduePunches && 'overdue-pass'}`} key={pass._id}>
                        <p>{pass.name}</p>
                        <div>
                            <p>{pass.punches} {pass.punches === 1 ? 'Punch' : 'Punches'}</p>
                            {pass.overduePunches && <p>({pass.overduePunches} {pass.overduePunches === 1 ? 'punch' : 'punches'} over limit)</p>}
                            {pass.expirationDate && <p>Expires on {pass.expirationDate.split('T')[0]}</p>}
                            <p>Pass Type: {pass.passType}</p>
                            {!auth.loggedIn() ? 
                                <div>
                                    <button className='form-btn' onClick={() => handlePunch(pass)}>Punch</button>   
                                    <button className='form-btn' onClick={() => handleRenew(pass)}>Renew</button>   
                                </div>
                            : ''}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PassList;