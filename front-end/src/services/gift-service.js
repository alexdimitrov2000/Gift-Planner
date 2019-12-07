const giftService = {
    load: function(id, limit) {
        return fetch(`http://localhost:9999/api/gift${id ? `/${id}` : ''}${limit ? `?limit=${limit}` : ''}`).then(res => res.json());
    }
};

export default giftService;