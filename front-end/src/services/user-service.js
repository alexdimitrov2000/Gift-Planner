const userService = {
    register: function (data) {
        return fetch('http://localhost:9999/api/user/register', {
            body: JSON.stringify(data),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.text().then(text => res.status === 200 ? text : Promise.reject(text)));
    },

    login: function (data) {
        return fetch('http://localhost:9999/api/user/login', {
            body: JSON.stringify(data),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(res => res.text().then(text => res.status === 200 ? text : Promise.reject(text)));
    },

    logout: function() {
        return fetch('http://localhost:9999/api/user/logout', {
            method: 'POST',
            credentials: 'include'
        }).then(res => res.text());
    }
};

export default userService;