import express, {
	type Request,
	type Response,
	type NextFunction,
} from "express";

const router = express.Router();

/* GET home page. */
router.get("/", (req: Request, res: Response, next: NextFunction) => {
	res.render("index", {
		title: "Welcome to our API Gateway",
	});
});

export default router;
