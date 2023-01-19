import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { App, Check2Square } from 'react-bootstrap-icons';

import auth from '../utils/auth';

const PassList = ({ searchParam, passList, setPassList, filterExpPass }) => {
    // const [passList, setPassList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);

    useEffect(() => {
        axios.get('/api/passes')
        .then(response => {
            setPassList(response.data);
            if (!filteredList.length) {
                let warningPassList;
                if (filterExpPass) {
                    warningPassList = response.data.filter(pass => {
                        if (pass.isNearlyFull === true) {
                            return true;
                        };
                        return false;
                    });
                };
                setFilteredList(warningPassList || response.data);
            };
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterExpPass]);

    useEffect(() => {
        let filteredList;

        filteredList = passList.filter(pass => {
            const passName = pass.name.toLowerCase();
            if (passName.includes(searchParam)) {
                return true;
            }
            return false;
        });

        if (filterExpPass) {
            filteredList = filteredList.filter(pass => {
                if (pass.isNearlyFull === true) {
                    return true;
                };
                return false;
            });
        };

        setFilteredList(filteredList);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParam, filterExpPass]);

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
            // set new expiration date
            let expDate;

            if (passInfo.passType === 'Regular') {
                let date = new Date();
                date = date.toISOString().split('T')[0];

                let nextYear = parseInt(date.split('-')[0]);
                nextYear++;
                const month = date.split('-')[1];
                const day = date.split('-')[2];

                const newDate = [nextYear, month, day].join('-');

                expDate = newDate;
            } else {
                let date = new Date();
                date = date.toISOString().split('T')[0];

                let year = parseInt(date.split('-')[0]);
                let nextMonth = parseInt(date.split('-')[1]);
                if (nextMonth === 12) {
                    nextMonth = 1;
                    year += 1;
                };
                const day = date.split('-')[2];

                const newDate = [year, nextMonth + 1, day].join('-');

                expDate = newDate;
            }

            axios.put(`/api/passes/${passInfo._id}`, { expirationDate: expDate });

            window.location.reload();
        });
    };

    const handleDelete = passInfo => {
        axios.delete(`/api/passes/${passInfo._id}`)
        .then(() => {
            window.location.reload();
        });
    };

    const handleDeleteNote = passInfo => {
        axios.put('/api/passes/note', { name: passInfo.name, passType: passInfo.passType, note: null })
        .then(() => {
            window.location.reload();
        });
    };

    const handleUncheckWaiver = passInfo => {
        axios.put(`/api/passes/${passInfo._id}/waiver`, { waiverReceived: false })
        .then(() => {
            window.location.reload();
        });
    };

    const handleCheckWaiver = passInfo => {
        axios.put(`/api/passes/${passInfo._id}/waiver`, { waiverReceived: true })
        .then(() => {
            window.location.reload();
        });
    };

    const formatDate = dateStr => {
        const dateArr = dateStr.split('-');
        return `${dateArr[1]}/${dateArr[2]}/${dateArr[0]}`;
    };

    return (
        <div className='pass-list-container'>
            <h1 className='list-title'>Fitness Punch Passes</h1>
            <div className='pass-list'>
                {filteredList.map(pass => (
                    <div className={`pass ${pass.isNearlyFull && 'overdue-pass'}`} key={pass._id}>
                        <div className='pass-info-container'>
                            <b> 
                                {!auth.loggedIn() ? 
                                <span>
                                {pass.waiverReceived === true ?
                                    <span onClick={() => handleUncheckWaiver(pass)}><Check2Square /> </span>
                                    :
                                    <span onClick={() => handleCheckWaiver(pass)}><App /> </span>
                                }
                                </span> : null}
                                {pass.name}
                            </b>
                            {!auth.loggedIn() ?
                            <>
                            {pass.note && <p style={{fontStyle: 'italic'}}>Note: {pass.note}</p>}
                            {pass.note && <button className='form-btn' onClick={() => handleDeleteNote(pass)}>Delete Note</button>}
                            <button className='form-btn' onClick={() => handleDelete(pass)}>Delete Pass</button>
                            </> : null}
                        </div>
                        <div className='pass-info-container'>
                            <p>{pass.punches} {pass.punches === 1 ? 'Punch' : 'Punches'}</p>
                            {pass.overduePunches && <p>({pass.overduePunches} {pass.overduePunches === 1 ? 'punch' : 'punches'} over limit)</p>}
                            <p>Pass Type: <b>{pass.passType}</b></p>
                            {pass.expirationDate && <p>Expires on {formatDate(pass.expirationDate.split('T')[0])}</p>}
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