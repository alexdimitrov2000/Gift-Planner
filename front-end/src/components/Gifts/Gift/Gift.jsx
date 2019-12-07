import React from 'react';
import './Gift.css';
import PropTypes from 'prop-types';

const Gift = (props) => {
    return <div className="gift">
        <img src={props.imageUrl} alt={props.name} />
        <h2>{props.name}</h2>
        <p>{props.children}</p>
    </div>
}

Gift.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
}

export default Gift;