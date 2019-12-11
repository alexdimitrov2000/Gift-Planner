import React from 'react';

function Logout({ history, logout }) {
    logout(history);
    return <div>Logged out</div>;
}

export default Logout;