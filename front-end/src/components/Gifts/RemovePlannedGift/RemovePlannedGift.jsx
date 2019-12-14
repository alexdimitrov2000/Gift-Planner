import React from 'react';
import giftService from '../../../services/gift-service';
import userService from '../../../services/user-service';
import auth from '../../../utils/auth';

function RemovePlannedGift({ history, ...props }) {
    const userUsername = auth.getUsername();
    const giftId = props.match.params.id;

    userService.getByUsername(userUsername).then(user => {
        giftService.removeGiver(giftId, user).then(() => {
            history.push('/profile');
        })
    })

    return <div>Gift removed</div>;
}

export default RemovePlannedGift;