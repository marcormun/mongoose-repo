const userController = require('../controllers/UserController');
const router = require('express').Router();


router.get('/users', userController.getAll)
router.get('/users/:id',userController.getUserById)
router.put('/users/:id',userController.updateUser)
router.delete('/users/:id',userController.deleteUser)

module.exports = router;