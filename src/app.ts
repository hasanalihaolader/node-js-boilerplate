import createError from "http-errors";
import express, {
	type Request,
	type Response,
	type NextFunction,
} from "express";
import path from "node:path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import bodyParser from "body-parser";

import indexRouter from "./routes/index";
import apiRouter from "./routes/api";
import { sequelize, checkDatabaseConnection } from "@/config/Database";

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/v1", apiRouter);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
	next(createError(404));
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	res.status(err instanceof Error ? 500 : 400).send("Something went wrong");
});

checkDatabaseConnection();

export default app;
