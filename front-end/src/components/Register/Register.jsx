import React from 'react';
import './Register.css';
import '../shared/styles/loginAndRegister.css'
import cloudinary from '../../cloudinary';

const Register = () => {
    return <div className="register-page">
        <div className="register-form">
            <form action="/register" method="POST">
                <h1 className="page-title">Register</h1>

                <div className="form-control required">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" />
                </div>

                <div className="form-control required">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" />
                </div>
                
                <div className="form-control required">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input type="password" name="confirm-password" id="confirm-password" />
                </div>
                
                <div className="form-control file">
                    <label>Profile picture</label>
                    <button type="button" id="upload_widget" onClick={() => cloudinary.open()} className="cloudinary-button">Upload files</button>
                </div>

                <div className="submit-button">
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    </div>;
}

export default Register;