/* eslint-disable no-undef */
import React from 'react';
import * as yup from 'yup';
// import Gifts from '../Gifts';
import './CreateGift.css';
import '../../shared/styles/formStyles.css';
import giftService from '../../../services/gift-service';
import cloudinaryData from '../../../cloudinaryDataConstants';
import { useFormControl, getSchemaValdationsRunner } from '../../shared/customHooks/useForm';

const fieldsValidations = {
    name: yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
    description: yup.string().required('Description is required'),
    imageUrl: yup.string().required('Image is required')
};

const schema = yup.object().shape(fieldsValidations);

const validationsRunner = getSchemaValdationsRunner(schema);

const CreateGift = ({ history }) => {
    const nameFormControl = useFormControl('');
    const imageUrlFormControl = useFormControl('');
    const descriptionFormControl = useFormControl('');
    const descTextareaRef = React.useRef();
    const [credentialsError, setCredentialsError] = React.useState(null);

    const cloudWidget = cloudinary.createUploadWidget({
        cloudName: cloudinaryData.cloudName,
        apiKey: cloudinaryData.apiKey,
        uploadPreset: cloudinaryData.uploadPreset
    }, (error, result) => {
        if (!error && result && result.event === "success") {
            imageUrlFormControl.setValue(result.info.url);
        }
    });

    const createPost = React.useCallback((е) => {
        е.preventDefault();

        nameFormControl.setErrors(undefined);
        imageUrlFormControl.setErrors(undefined);
        descriptionFormControl.setErrors(undefined);

        validationsRunner({
            name: nameFormControl.value,
            imageUrl: imageUrlFormControl.value,
            description: descTextareaRef.current.value
        }).then((data) => {
            giftService.create(data).then((gift) => {
                history.push('/');
            })
        }).catch(errors => {
            if (errors.name) { nameFormControl.setErrors(errors.name); }
            if (errors.description) { descriptionFormControl.setErrors(errors.description); }
            if (errors.imageUrl) { imageUrlFormControl.setErrors(errors.imageUrl); }
        });
    }, [nameFormControl, imageUrlFormControl, descriptionFormControl]);

    return <div className="create-gift-page">
        <div className="wrapper">
            <div className="create-gift-form">
                <form>
                    <h1 className="page-title">Create Gift</h1>

                    <div className="form-control required">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" onChange={nameFormControl.changeHandler} />
                        {nameFormControl.errors && <p className="error">{nameFormControl.errors[0]}</p>}
                    </div>

                    <div className="form-control file required">
                        <label>Gift Image</label>
                        <button type="button" id="upload_widget" disabled={!!imageUrlFormControl.value} onClick={() => cloudWidget.open()} className="cloudinary-button">Upload files</button>
                        {imageUrlFormControl.errors && <p className="error">{imageUrlFormControl.errors[0]}</p>}
                    </div>

                    <div className="form-control required">
                        <label htmlFor="description">Description</label>
                        <textarea name="description" id="description" rows="2" ref={descTextareaRef} ></textarea>
                        {descriptionFormControl.errors && <p className="error">{descriptionFormControl.errors[0]}</p>}
                        {credentialsError && <p className="error">{credentialsError}</p>}
                    </div>

                    <div className="submit-button">
                        <button type="submit" onClick={createPost}>Create</button>
                    </div>
                </form>
            </div>
        </div>
    </div>;
}

export default CreateGift;