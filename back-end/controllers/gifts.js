const models = require('../models');

module.exports = {
    get: (req, res, next) => {
        const limit = +req.query.limit;

        if (limit) {
            models.Gift.find().sort({ _id: -1 }).limit(limit)
                .then(gifts => res.send(gifts))
                .catch(next);
            return;
        }

        models.Gift.find()
            .then((gifts) => res.send(gifts))
            .catch(next);
    },

    post: {
        create: (req, res, next) => {
            const { name, imageUrl, description } = req.body;

            models.Gift.create({ name, imageUrl, description })
                .then((createdGift) => {
                    res.send(createdGift);
                })
                .catch(next);
        }
    },

    put: {
        addGiver: (req, res, next) => {
            const giftId = req.params.id;
            const userId = req.user._id;

            Promise.all([
                models.User.updateOne({ _id: userId }, { $push: { gifts: giftId } }),
                models.Gift.updateOne({ _id: giftId }, { $push: { givers: userId } })
            ]).then(() => {
                res.redirect('/');
            });
        }
    },

    delete: (req, res, next) => {
        const id = req.params.id;
        models.Gift.deleteOne({ _id: id })
            .then((removedGift) => res.send(removedGift))
            .catch(next)
    }
};