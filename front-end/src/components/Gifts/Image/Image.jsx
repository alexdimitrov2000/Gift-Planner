import React from 'react';
import './Image.css';

const Image = ({ imageUrl, alt }) => {
    return (<span className="media">
        <a href="#">
            <img src={imageUrl} alt={alt} />
        </a>
    </span>);
}

export default Image;