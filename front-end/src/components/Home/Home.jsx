import React from 'react';
import './Home.css';
import Gifts from '../Gifts/Gifts';

const Home = () => {
    return <div>
        <div className="welcome-banner">Welcome To The Hood</div>
        <Gifts limit={3} />
        <div className="xmas"></div>
    </div>;
}

export default Home;