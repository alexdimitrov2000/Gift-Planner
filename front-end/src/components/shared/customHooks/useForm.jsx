import React from 'react';

const getControlChangeHandler = (setValue) => {
    let id;
    return e => {
        const newValue = e.target.value;
        if (id) { clearTimeout(id); id = null; }

        id = setTimeout(() => {
            setValue(newValue);
            id = null;
        }, 100);
    }
}

export const getSchemaValdationsRunner = schema => form => {
    if (!schema) { return Promise.resolve(); }

    return schema.validate(form, { abortEarly: false }).then(() => form).catch(err => {
        const errors = err.inner.reduce((acc, { path, message }) => {
            acc[path] = (acc[path] || []).concat(message);
            return acc;
        }, {});

        return Promise.reject(errors);
    });
}

export const useFormControl = (defaultValue) => {
    const [value, setValue] = React.useState(defaultValue);
    const [errors, setErrors] = React.useState(undefined);

    const changeHandler = React.useCallback(
        getControlChangeHandler(setValue),
        [setValue]
    );

    return React.useMemo(() => ({ value, setValue, errors, setErrors, changeHandler }), [value, setValue, errors, setErrors, changeHandler]);
};