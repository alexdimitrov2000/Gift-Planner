/* eslint-disable no-undef */
import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import auth from '../../utils/auth';
import cloudinaryData from '../../cloudinaryDataConstants';
import userService from '../../services/user-service';
import Loader from 'react-loading';
import Gifts from '../Gifts/Gifts'

const Profile = ({ history }) => {
    const [user, setUser] = React.useState(null);
    const [lastGift, setLastGift] = React.useState(null);
    const [hasProfilePic, setHasProfilePic] = React.useState(false);
    const username = auth.getUsername();
    
    const cloudWidget = cloudinary.createUploadWidget({
        cloudName: cloudinaryData.cloudName,
        apiKey: cloudinaryData.apiKey,
        uploadPreset: cloudinaryData.uploadPreset
    }, (error, result) => {
        if (!error && result && result.event === "success") {
            userService.changeProfilePic(username, result.info.url);
            setHasProfilePic(true);
        }
    });
    
    const removeAvatar = () => {
        userService.changeProfilePic(username, cloudinaryData.defaultProfilePictureUrl);
        setHasProfilePic(false);
    }
    
    React.useEffect(() => {
        userService.getByUsername(username).then(user => {
            setUser(user);
            setHasProfilePic(user.profilePictureUrl !== cloudinaryData.defaultProfilePictureUrl);

            if (user.gifts.length !== 0) {
                setLastGift([user.gifts[user.gifts.length - 1]]);
            }
        })
    }, [username, setLastGift, setHasProfilePic, hasProfilePic]);

    return <div className="profile-page">
        <div className="wrapper">
            {user ?
                <div className="user-info">
                    <h2 className="user-username">Username: {user.username}</h2>
                    <span className="img-container">
                        <img className="user-picture" src={user.profilePictureUrl} alt={user.username} />
                    </span>
                    <div className="buttons">
                        <button type="button" id="upload_widget" onClick={() => cloudWidget.open()} className="change-button">Change Avatar</button>
                        <button type="button" onClick={() => removeAvatar()} className="remove-button" disabled={!hasProfilePic}>Remove Avatar</button>
                    </div>
                </div> : <Loader className="loader" type="spinningBubbles" color="#0F8A5F" width="7rem" height="7rem" />
            }

            <div className="user-gifts">
                <h2>Last planned gift</h2>
                {lastGift ?
                    <Gifts propGifts={lastGift} />
                    : <h3>No gifts. Check our <Link to="/gifts/all">suggestions</Link>.</h3>}
            </div>
        </div>
    </div>;
}

export default Profile;