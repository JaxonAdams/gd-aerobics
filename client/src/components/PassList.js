import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
                            <p>Pass Type: {pass.passType}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PassList;