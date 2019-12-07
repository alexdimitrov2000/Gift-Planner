import React from 'react'
import './Gifts.css'
import PropTypes from 'prop-types';

import Gift from './Gift/Gift'
import giftService from '../../services/gift-service';

class Gifts extends React.Component {
    state = {
        gifts: null
    };

    componentDidMount() {
        giftService.load(null, this.props.limit).then(gifts => {
            this.setState({ gifts });
        });
    }

    render() {
        const { gifts } = this.state;

        return <div>
            {gifts ?
                <div className="gifts">{gifts.map(gift => <Gift key={gift._id} id={gift._id} name={gift.name} imageUrl={gift.imageUrl}>{gift.description}</Gift>)}</div>
                : <div>Loading...</div>}
        </div>
    }
}

Gifts.propTypes = {
    limit: PropTypes.number
}

export default Gifts;