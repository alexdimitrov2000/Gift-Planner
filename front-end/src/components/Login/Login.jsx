import React from 'react';
import './Login.css';
import '../shared/styles/loginAndRegister.css';

const Login = () => {
    return <div className="login-page">
        <div className="login-form">
            <form action="/login" method="POST">
                <h1 className="page-title">Login</h1>

                <div className="form-control">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" />
                </div>

                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" />
                </div>

                <div className="submit-button">
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    </div>;
}

export default Login;