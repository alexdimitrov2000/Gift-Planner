import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import auth from '../../utils/auth';
import userService from '../../services/user-service';
import Loader from 'react-loading';
import Gifts from '../Gifts/Gifts'

const Profile = () => {
    const [user, setUser] = React.useState(null);
    const [lastGift, setLastGift] = React.useState(null);
    const username = auth.getUsername();

    React.useEffect(() => {
        userService.getByUsername(username).then(user => {
            setUser(user);

            if (user.gifts.length !== 0) {
                setLastGift([user.gifts[user.gifts.length - 1]]);
            }
        })
    }, [username, setLastGift]);

    return <div className="profile-page">
        <div className="wrapper">
            {user ?
                <div className="user-info">
                    <h2 className="user-username">Username: {user.username}</h2>
                    <span className="img-container">
                        <img className="user-picture" src={user.profilePictureUrl} alt={user.username} />
                    </span>
                </div> : <Loader className="loader" type="spinningBubbles" color="#0F8A5F" width="7rem" height="7rem" />
            }

            <div className="user-gifts">
                <h2>Last planned gift</h2>
                {lastGift ?
                    <Gifts propGifts={lastGift} />
                    : <h3>No gifts. Check our <Link to="/gifts">suggestions</Link>.</h3>}
            </div>
        </div>
    </div>;
}

export default Profile;