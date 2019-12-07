import React from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return <nav className="site-nav">
        <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/profile">Profile</Link></li>
        </ul>
    </nav>;
}

export default Navigation;