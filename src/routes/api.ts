import express, { Request, Response, NextFunction } from 'express';
import UserController from '../controller/userController';
import authenticateToken from '../middleware/authenticateToken';
import AuthController from '../controller/authController';

const router = express.Router();

// Auth
router.post('/login', AuthController.login);
router.post('/refresh', authenticateToken, AuthController.refresh);

// User
const userRouter = express.Router();
userRouter.use(authenticateToken);

router.use('/user', userRouter);

userRouter.get('', UserController.getUsers);
userRouter.post('/create', UserController.create);
userRouter.post('/update/:id', UserController.update);
userRouter.post('/profile', UserController.userProfile);

export default router;
