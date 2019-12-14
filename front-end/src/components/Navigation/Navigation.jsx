import React from 'react';
import './Navigation.css';
import { Link, NavLink } from 'react-router-dom';

function Navigation({ isLogged }) {
    return <nav className="site-nav">
        {isLogged ?
            <ul>
                <li><NavLink to="/gifts/create" activeClassName="active">Create Gift</NavLink></li>
                <li><NavLink to="/profile" activeClassName="active">Profile</NavLink></li>
                <li><Link to="/logout">Logout</Link></li>
            </ul>
            :
            <ul>
                <li><NavLink to="/login" activeClassName="active">Login</NavLink></li>
                <li><NavLink to="/register" activeClassName="active">Register</NavLink></li>
            </ul>
        }
    </nav>;
}

export default Navigation;