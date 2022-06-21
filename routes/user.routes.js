const userController = require('../controllers/UserController');
const router = require('express').Router();


router.get('/users', userController.getAll)

router.post('/users', userController.post)

module.exports = router;