var express = require('express');
const UserController = require('../controller/userController');
const authenticateToken = require('../middleware/authenticateToken');
const AuthController = require('../controller/authController');
var router = express.Router();

//Auth
router.post('/login', AuthController.login);
router.post('/refresh', authenticateToken, AuthController.refresh);

//User
const userRouter = express.Router();
userRouter.use(authenticateToken)
router.use('/user', userRouter);
userRouter.post('/create', UserController.create);
userRouter.post('/update/:id', UserController.update);

module.exports = router;
