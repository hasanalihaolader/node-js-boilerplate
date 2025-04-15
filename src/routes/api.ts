import express, {
	type Request,
	type Response,
	type NextFunction,
} from "express";
import UserController from "@/controller/userController";
import authenticateToken from "@/middleware/authenticateToken";
import AuthController from "@/controller/authController";
const router = express.Router();

function asyncHandler(
	fn: (req: Request, res: Response, next: NextFunction) => Promise<any>,
) {
	return (req: Request, res: Response, next: NextFunction) => {
		Promise.resolve(fn(req, res, next)).catch(next);
	};
}

// Auth
router.post("/login", asyncHandler(AuthController.login));
router.post(
	"/refresh",
	authenticateToken,
	asyncHandler(AuthController.refresh),
);

// User
const userRouter = express.Router();
userRouter.use(authenticateToken);
router.use("/user", userRouter);
userRouter.get("", asyncHandler(UserController.getUsers));
userRouter.post("/create", asyncHandler(UserController.create));
userRouter.post("/update/:id", asyncHandler(UserController.update));
userRouter.post("/profile", asyncHandler(UserController.userProfile));

export default router;
