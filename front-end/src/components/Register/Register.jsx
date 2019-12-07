import React from 'react';
import './Register.css';

const Register = () => {
    return <form action="/register" method="POST">
        <h1 className="page-title">Register</h1>

        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" />
        
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />

        <button type="submit">Register</button>
    </form>;
}

export default Register;