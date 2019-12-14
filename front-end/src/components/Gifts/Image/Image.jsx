import React from 'react';
import './Image.css';

const Image = ({ imageUrl, alt, giftId }) => {
    return (<span className="media">
        <span>
            <span className="gift-image">
                <img src={imageUrl} alt={alt} />
            </span>
            <a href={"/gifts/addGiver/" + giftId} className="add-btn" >Add to your gifts</a>
            <a href={"/gifts/removeGiver/" + giftId} className="remove-btn" >Remove</a>
        </span>
    </span>);
}

export default Image;