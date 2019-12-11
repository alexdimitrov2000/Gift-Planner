import React from 'react';
import './Login.css';
import * as yup from 'yup';

import '../shared/styles/loginAndRegister.css';
import withForm from '../shared/hocs/withForm';

class Login extends React.Component {
    usernameOnChangeHandler = this.props.controlChangeHandlerFactory('username');
    passwordOnChangeHandler = this.props.controlChangeHandlerFactory('password');

    submitHandler = (event) => {
        event.preventDefault();

        this.props.runValidations()
            .then(formData => console.log(formData))
            .catch(err => {
                console.error(err);
                return;
            });

        const errors = this.props.getFormErrors();
        if (!!errors) { return; }

        const data = this.props.getFormState();
        this.props.login(this.props.history, data);
    }

    render() {
        const usernameErr = this.props.getFirstFieldError('username');
        const passwordErr = this.props.getFirstFieldError('password');

        return <div className="login-page">
            <div className="login-form">
                <form>
                    <h1 className="page-title">Login</h1>

                    <div className="form-control">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id="username" onChange={this.usernameOnChangeHandler} />
                        {usernameErr && <p className="error">{usernameErr}</p>}
                    </div>

                    <div className="form-control">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" onChange={this.passwordOnChangeHandler} />
                        {passwordErr && <p className="error">{passwordErr}</p>}
                    </div>

                    <div className="submit-button">
                        <button type="submit" onClick={this.submitHandler}>Login</button>
                    </div>
                </form>
            </div>
        </div>;
    }
}

const initialFormState = {
    username: '',
    password: ''
}

const schema = yup.object({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required')
});

export default withForm(Login, initialFormState, schema);