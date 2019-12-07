/* eslint-disable no-undef */

const myWidget = cloudinary.createUploadWidget({
    cloudName: 'dux8m4bux',
    apiKey: '134699845585285',
    uploadPreset: 'softuni'
}, (error, result) => {
    if (!error && result && result.event === "success") {
        console.log('Done! Here is the image info: ', result.info);
    }
});

export default myWidget;