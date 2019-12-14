import React from 'react';
import './Image.css';

const Image = ({ imageUrl, alt, giftId }) => {
    return (<span className="media">
        <span>
            <span className="gift-image">
                <img src={imageUrl} alt={alt} />
            </span>
            <a href={"/gifts/addGiver/" + giftId} className="add-btn" >Add to your gifts</a>
        </span>
    </span>);

    /* 
    <span class="media">
        <a href="#">
            <span class="member-image">
                <img src="{{ worker.image_src }}" alt="{{ worker.name }}">
            </span>
            <strong class="member-desc">{{ worker.description }}</strong>
        </a>
    </span>
    */
}

export default Image;