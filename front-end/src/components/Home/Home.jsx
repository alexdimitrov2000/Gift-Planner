import React from 'react';
import './Home.css';
import Gifts from '../Gifts/Gifts';

const Home = () => {
    return <div>
        <div className="welcome-banner">
            <div className="wrapper">
                <p className="main-greet">Plan your Christmas Gifts</p>
                <p className="secondary-greet">Surprise your family and friends</p>
            </div>
        </div>
        <Gifts limit={3} />
    </div>
};

export default Home;