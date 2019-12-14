import React from 'react';
import './MyGifts.css';
import { Link } from 'react-router-dom';
import Gifts from '../Gifts/Gifts';
import auth from '../../utils/auth';
import userService from '../../services/user-service';

const MyGifts = () => {
    const [myGifts, setMyGifts] = React.useState(null);
    const username = auth.getUsername();

    React.useEffect(() => {
        userService.getByUsername(username).then(user => {
            setMyGifts(user.gifts);
        })
    }, [username, setMyGifts]);

    return <div className="my-gifts-page">
        <div className="wrapper">
            <header>
                <h1 className="page-title">My Gifts</h1>
            </header>
            {myGifts && myGifts.length > 0 ?
                <Gifts propGifts={myGifts} /> :
                <h2 className="no-gifts-msg">No gifts. Check our <Link to="/gifts">suggestions</Link>.</h2>
            }
        </div>
    </div>
}

export default MyGifts;