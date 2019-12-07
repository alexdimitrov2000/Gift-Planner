const controllers = require('../controllers/');
const router = require('express').Router();
const { auth } = require('../utils');

router.get('/', controllers.gifts.get);

router.post('/', auth(), controllers.gifts.post);

router.put('/:id', auth(), controllers.gifts.put.addGiver);

router.delete('/:id', auth(), controllers.gifts.delete);

module.exports = router;