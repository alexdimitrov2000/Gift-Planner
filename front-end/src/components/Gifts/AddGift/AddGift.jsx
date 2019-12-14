import React from 'react';
import giftService from '../../../services/gift-service';
import userService from '../../../services/user-service';
import auth from '../../../utils/auth';

function AddGift({ history, ...props }) {
    const userUsername = auth.getUsername();
    const giftId = props.match.params.id;

    console.log(userUsername, giftId);

    userService.getByUsername(userUsername).then(user => {
        console.log(user);
        giftService.addGiver(giftId, user).then(() => {
            history.push('/profile');
        })
    })

    return <div>Gift added</div>;
}

export default AddGift;