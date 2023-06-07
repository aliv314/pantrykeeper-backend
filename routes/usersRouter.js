const router = require('express').Router();
const usersController = require('../controllers/usersController');

router.route('/')
.post(usersController.postUser);

router.route('/:id')
.get(usersController.getPantries);
module.exports = router;