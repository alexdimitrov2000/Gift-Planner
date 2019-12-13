const giftService = {
    load: function (id, limit) {
        return fetch(`http://localhost:9999/api/gift${id ? `/${id}` : ''}${limit ? `?limit=${limit}` : ''}`).then(res => res.json());
    },

    create: function (data) {
        return fetch(`http://localhost:9999/api/gift/create`, {
            body: JSON.stringify(data),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        }).then(res => res.json());
    }
};

export default giftService;