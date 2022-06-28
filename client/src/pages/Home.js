import React from 'react';

import Header from '../components/Header';
import PassList from '../components/PassList';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div>
            <Header />
            <PassList />
            <Footer />
        </div>
    );
};

export default Home;