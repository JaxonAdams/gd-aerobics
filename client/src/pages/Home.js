import React, { useState } from 'react';

import Header from '../components/Header';
import PassList from '../components/PassList';
import Footer from '../components/Footer';

const Home = () => {
    const [searchParam, setSearchParam] = useState('');

    return (
        <div>
            <Header searchParam={searchParam} setSearchParam={setSearchParam} />
            <PassList searchParam={searchParam} />
            <Footer />
        </div>
    );
};

export default Home;