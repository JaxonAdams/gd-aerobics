import React, { useState } from 'react';

import Header from '../components/Header';
import PassList from '../components/PassList';
import AddPass from '../components/AddPass';
import Footer from '../components/Footer';

import auth from '../utils/auth';

const Home = () => {
    const [searchParam, setSearchParam] = useState('');

    return (
        <div>
            <Header searchParam={searchParam} setSearchParam={setSearchParam} />
            <PassList searchParam={searchParam} />
            {!auth.loggedIn() && <AddPass />}
            <Footer />
        </div>
    );
};

export default Home;