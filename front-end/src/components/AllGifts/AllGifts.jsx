import React from 'react';
import './AllGifts.css';
import Gifts from '../Gifts/Gifts';

const AllGifts = () => {
    return <div className="all-gifts-page">
        <div className="wrapper">
            <header>
                <h1 className="page-title">All Gifts</h1>
            </header>
            <Gifts />
        </div>
    </div>
}

export default AllGifts;