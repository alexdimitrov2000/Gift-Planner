import React from 'react';
import './Header.css';
import Navigation from '../Navigation/Navigation';
import { Link } from 'react-router-dom';

const Header = () => {
    return <header className="site-header">
        <div className="wrapper">
            <div className="site-branding">
                <Link to="/">
                    <p className="site-title">Site Title</p>
                </Link>
                
            </div>
            <Navigation />
        </div>
    </header>;
}

export default Header;