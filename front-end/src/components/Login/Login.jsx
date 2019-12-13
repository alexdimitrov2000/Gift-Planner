import React from 'react';
import './Login.css';
import * as yup from 'yup';
import { Link } from 'react-router-dom';

import '../shared/styles/formStyles.css';
import { useFormControl, getSchemaValdationsRunner } from '../shared/customHooks/useForm';

const fieldsValidations = {
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required')
};

const schema = yup.object().shape(fieldsValidations);

const validationsRunner = getSchemaValdationsRunner(schema);

const Login = ({ login, history }) => {
    const usernameFormControl = useFormControl('');
    const passwordFormControl = useFormControl('');
    const [credentialsError, setCredentialsError] = React.useState(null);

    const submitHandler = React.useCallback((e) => {
        e.preventDefault();
        
        usernameFormControl.setErrors(undefined);
        passwordFormControl.setErrors(undefined);
    
        validationsRunner({
            username: usernameFormControl.value,
            password: passwordFormControl.value
        }).then((data) => {
            login(history, data).catch(error => {
                setCredentialsError(error);
            });
        }).catch(errors => {
            if (errors.username) { usernameFormControl.setErrors(errors.username); }
            if (errors.password) { passwordFormControl.setErrors(errors.password); }
        });
    }, [usernameFormControl, passwordFormControl, setCredentialsError, login, history]);

    return <div className="login-page">
        <div className="login-form">
            <form>
                <h1 className="page-title">Login</h1>

                <div className="form-control">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" onChange={usernameFormControl.changeHandler} />
                    {usernameFormControl.errors && <p className="error">{usernameFormControl.errors[0]}</p>}
                </div>

                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" onChange={passwordFormControl.changeHandler} />
                    {passwordFormControl.errors && <p className="error">{passwordFormControl.errors[0]}</p>}
                    {credentialsError && <p className="error">{credentialsError}</p>}
                </div>

                <div className="submit-button">
                    <button type="submit" onClick={submitHandler}>Login</button>
                </div>

                <p>
                    Don't have an account? <Link to="/register">Register</Link> right now.
                </p>
            </form>
        </div>
    </div>;
}

export default Login;