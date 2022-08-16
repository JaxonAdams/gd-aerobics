import React, { useState } from 'react';

import Header from '../components/Header';
import PassList from '../components/PassList';
import AddPass from '../components/AddPass';
import AddNote from '../components/AddNote';
import Footer from '../components/Footer';

import auth from '../utils/auth';

const Home = () => {
    const [passList, setPassList] = useState([]);
    const [searchParam, setSearchParam] = useState('');

    return (
        <div>
            <Header searchParam={searchParam} setSearchParam={setSearchParam} />
            <PassList searchParam={searchParam} passList={passList} setPassList={setPassList} />
            {!auth.loggedIn() && <AddNote />}
            {!auth.loggedIn() && <AddPass />}
            <Footer passList={passList} />
        </div>
    );
};

export default Home;