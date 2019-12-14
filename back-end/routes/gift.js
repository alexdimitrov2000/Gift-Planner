const controllers = require('../controllers/');
const router = require('express').Router();
const { auth } = require('../utils');

router.get('/', controllers.gifts.get);

router.post('/create', auth(), controllers.gifts.post.create);

router.put('/addGiver/:id', auth(), controllers.gifts.put.addGiver);

router.put('/removeGiver/:id', auth(), controllers.gifts.put.removeGiver);

router.delete('/:id', auth(), controllers.gifts.delete);

module.exports = router;