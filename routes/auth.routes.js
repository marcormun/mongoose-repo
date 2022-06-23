const router = require('express').Router();
const authController = require('../controllers/AuthController');
const verifyToken = require('../middlewares/verifyToken');

router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.get('/auth/profile', verifyToken, authController.profile);

module.exports = router;