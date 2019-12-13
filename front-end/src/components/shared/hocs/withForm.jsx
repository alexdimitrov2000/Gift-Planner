import React from 'react';

export default function withForm(Cmp, initialState, schema) {
    return class extends React.Component {
        state = {
            form: initialState,
            errors: undefined
        };

        controlChangeHandlerFactory = name => {
            let id;
            return e => {
                const newValue = e.target.value;
                if (id) { clearTimeout(id); id = null; }

                id = setTimeout(() => {
                    this.setState(({ form }) => {
                        return { form: { ...form, [name]: newValue } };
                    });

                    id = null;
                }, 200);
            }
        }

        setProfilePicUrl = url => {
            this.setState(({ form }) => {
                return { form: { ...form, 'profilePictureUrl': url } }
            })
        }

        getFormState = () => {
            return this.state.form;
        };

        getFormErrors = () => {
            return this.state.errors;
        }

        getFirstFieldError = name => {
            const errorState = this.state.errors;
            return errorState && errorState[name] && errorState[name][0];
        }

        runValidations = () => {
            if (!schema) { return Promise.resolve(); }

            const result = schema.validate(this.state.form, { abortEarly: false }).then(() => {
                this.setState({ errors: undefined });
                return this.state.form;
            }).catch(err => {
                const errors = err.inner.reduce((acc, { path, message }) => {
                    acc[path] = (acc[path] || []).concat(message);
                    return acc;
                }, {});
                this.setState({ errors });

                return errors;
            });

            return result;
        }

        render() {
            return <Cmp {...this.props} controlChangeHandlerFactory={this.controlChangeHandlerFactory} runValidations={this.runValidations} getFormState={this.getFormState} getFormErrors={this.getFormErrors} getFirstFieldError={this.getFirstFieldError} setProfilePicUrl={this.setProfilePicUrl} />
        }
    }
}