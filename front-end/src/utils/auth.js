const auth = {
    isLogged: function () {
        const cookies = getCookies();
        return !!cookies['x-auth-token'];
    },

    getUsername: function () {
        return getCookies()['username'] || null;
    },
};

function getCookies() {
    return document.cookie.split('; ').reduce((acc, cookie) => {
        const [cookieName, cookieVal] = cookie.split('=');
        acc[cookieName] = cookieVal;

        return acc;
    }, {});
}

export default auth;