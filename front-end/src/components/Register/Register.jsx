/* eslint-disable no-undef */
import React from 'react';
import './Register.css';
import * as yup from 'yup'

import '../shared/styles/formStyles.css';
import cloudinaryData from '../../cloudinaryDataConstants';
import withForm from '../shared/hocs/withForm';
import userService from '../../services/user-service';


class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cloudWidget: cloudinary.createUploadWidget({
                cloudName: cloudinaryData.cloudName,
                apiKey: cloudinaryData.apiKey,
                uploadPreset: cloudinaryData.uploadPreset
            }, (error, result) => {
                if (!error && result && result.event === "success") {
                    console.log('Done! Here is the image info: ', result.info);
                    
                    this.props.setProfilePicUrl(result.info.url);
                }
            }),
            isImgUploaded: false,
            serverError: null
        }
    }

    usernameOnChangeHandler = this.props.controlChangeHandlerFactory('username');
    passwordOnChangeHandler = this.props.controlChangeHandlerFactory('password');
    confirmPasswordOnChangeHandler = this.props.controlChangeHandlerFactory('confirmPassword');
    
    uploadImage = () => {
        this.state.cloudWidget.open();

        this.setState({ isImgUploaded: true });
    }

    submitHandler = (event) => {
        event.preventDefault();

        this.props.runValidations()
        .then(formData => console.log(formData))
        .catch(err => console.error(err));

        const errors = this.props.getFormErrors();
        if (!!errors) { return; }

        const data = this.props.getFormState();
        userService.register(data).then(() => {
            this.props.history.push('/login');
        }).catch(err => {
            this.setState({ serverError: err });
        });
    }

    render() {
        const usernameErr = this.props.getFirstFieldError('username');
        const passwordErr = this.props.getFirstFieldError('password');
        const confirmPassErr = this.props.getFirstFieldError('confirmPassword');
        const { serverError } = this.state;

        return <div className="register-page">
            <div className="register-form">
                <form>
                    <h1 className="page-title">Register</h1>

                    <div className="form-control required">
                        {serverError && <p className="error">{serverError}</p>}
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id="username" onChange={this.usernameOnChangeHandler} />
                        {usernameErr && <p className="error">{usernameErr}</p>}
                    </div>

                    <div className="form-control required">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" onChange={this.passwordOnChangeHandler} />
                        {passwordErr && <p className="error">{passwordErr}</p>}
                    </div>

                    <div className="form-control required">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" name="confirmPassword" id="confirmPassword" onChange={this.confirmPasswordOnChangeHandler} />
                        {confirmPassErr && <p className="error">{confirmPassErr}</p>}
                    </div>

                    <div className="form-control file">
                        <label>Profile picture</label>
                        <button type="button" id="upload_widget" disabled={this.state.isImgUploaded} onClick={this.uploadImage} className="cloudinary-button">Upload file</button>
                    </div>

                    <div className="submit-button">
                        <button type="submit" onClick={this.submitHandler}>Register</button>
                    </div>
                </form>
            </div>
        </div>;
    }

}
const initialFormState = {
    username: '',
    password: '',
    confirmPassword: '',
    profilePictureUrl: ''
}

const schema = yup.object().shape({
    username: yup.string().required('Username is required.').min(4, 'Username must be more than 4 chars'),
    password: yup.string().required('Password is required.').min(4, 'Password must be more than 4 chars'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords do not match.').required('Confirm password is required.').min(4, 'Confirm password must be more than 4 chars')
});

export default withForm(Register, initialFormState, schema);