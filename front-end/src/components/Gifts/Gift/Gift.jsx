import React from 'react';
import PropTypes from 'prop-types';
import './Gift.css';
import Image from '../Image/Image'

const Gift = (props) => {
    return <li className="gift">
        <Image imageUrl={props.imageUrl} alt={props.name} giftId={props.id} />
        <span className="gift-info">
            <strong className="gift-name">{props.name}</strong>
            <span className="gift-desc">{props.children}</span>
        </span>
    </li>
}

Gift.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
}

export default Gift;