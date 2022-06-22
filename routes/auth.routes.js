const router = require('express').Router();
const authController = require('../controllers/AuthController');

router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

module.exports = router;