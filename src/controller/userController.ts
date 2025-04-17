import dotenv from "dotenv";
dotenv.config();

import type { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import helper from "@/helper/Helper";
import userRepository from "@/repository/UserRepository";
import logger from "@/utils/Logger";

interface JwtPayload {
	userId: number;
}

class UserController {
	getUsers = async (req: Request, res: Response, next: NextFunction) => {
		let statusCode = 200;
		let message = "User data fetched successfully";
		let context: object = {};

		try {
			const users = await userRepository.findAll();
			console.log(users);

			if (users.length > 0) {
				context = users;
			} else {
				statusCode = 404;
				message = "User data not found";
			}
		} catch (error: any) {
			logger.error(500, [], "userController", "", error);
			statusCode = 500;
			context = {
				name: error.name,
				errors: [
					{
						message: error?.errors?.[0]?.message || "Internal server error",
						type: error?.errors?.[0]?.type || "unknown",
					},
				],
			};
		}

		return res
			.status(statusCode)
			.json(helper.formatApiResponse(statusCode, message, context));
	}

	userProfile = async (req: Request, res: Response, next: NextFunction) => {
		const token = req.header("Authorization");

		if (!token) {
			return res
				.status(401)
				.json(
					helper.formatApiResponse(401, "Access Denied. No token provided."),
				);
		}

		try {
			const decoded = jwt.verify(
				token,
				process.env.SECRET_KEY as string,
			) as JwtPayload;
			const user = await userRepository.findById(decoded.userId);
			console.log(user);

			return res
				.status(200)
				.json(
					helper.formatApiResponse(200, "User profile fetched successfully", {
						user,
					}),
				);
		} catch (error) {
			console.log(error);
			return res
				.status(400)
				.json(helper.formatApiResponse(400, "User profile fetch failed."));
		}
	}

	create = async (req: Request, res: Response, next: NextFunction) => {
		let statusCode = 500;
		let message = "Failed to create user";
		let context: any = {};

		try {
			req.body.password = await bcrypt.hash(req.body.password, 10);
			const user = await userRepository.store(req.body);

			if (user.id) {
				statusCode = 201;
				message = "Successfully created new user";
				context = user;
			}
		} catch (error: any) {
			statusCode = 500;
			context = {
				name: error.name,
				errors: [
					{
						message: error?.errors?.[0]?.message || "Internal server error",
						type: error?.errors?.[0]?.type || "unknown",
					},
				],
			};
		}

		return res
			.status(statusCode)
			.json(helper.formatApiResponse(statusCode, message, context));
	}

	update = async (req: Request, res: Response, next: NextFunction) => {
		let statusCode = 500;
		let message = "Failed to update user";
		let context: any = {};
		const id = Number.parseInt(req.params.id);

		try {
			if (req.body.password) {
				delete req.body.password;
			}

			const user = await userRepository.update(req.body, id);

			if (user?.id) {
				statusCode = 200;
				message = "Successfully updated user";
				context = user;
			}
		} catch (error: any) {
			statusCode = 500;
			context = {
				name: error.name,
				errors: [
					{
						message: error?.errors?.[0]?.message || "Internal server error",
						type: error?.errors?.[0]?.type || "unknown",
					},
				],
			};
		}

		return res
			.status(statusCode)
			.json(helper.formatApiResponse(statusCode, message, context));
	}
}

export default new UserController();
