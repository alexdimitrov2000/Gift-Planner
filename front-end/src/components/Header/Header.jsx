import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Navigation from '../Navigation/Navigation';

const Header = ({ isLogged }) => {
    return <header className="site-header">
        <div className="wrapper">
            <div className="site-branding">
                <Link to="/">
                    <p className="site-title">Site Title</p>
                </Link>
                
            </div>
            <Navigation isLogged={isLogged} />
        </div>
    </header>;
}

export default Header;