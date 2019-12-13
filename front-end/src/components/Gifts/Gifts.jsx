import React from 'react'
import './Gifts.css'
import PropTypes from 'prop-types';
import Loader from 'react-loading';

import Gift from './Gift/Gift'
import giftService from '../../services/gift-service';

const Gifts = ({ limit }) => {
    const [gifts, setGifts] = React.useState(null);

    React.useEffect(() => {
        giftService.load(null, limit).then(gifts => {
            setGifts(gifts);
        });
    }, [limit]);

    return <div className="gifts-section">
        <header>
            <h1 className="page-title">Top 3 Gifts</h1>
        </header>

        <div className="wrapper">
            {gifts ?
                <ul className="gifts">{gifts.map(gift => <Gift key={gift._id} id={gift._id} name={gift.name} imageUrl={gift.imageUrl}>{gift.description}</Gift>)}</ul>
                : <Loader className="loader" type="spinningBubbles" color="#0F8A5F" width="7rem" height="7rem" />}
        </div>
    </div>
}

Gifts.propTypes = {
    limit: PropTypes.number
}

export default Gifts;