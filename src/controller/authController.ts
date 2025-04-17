import dotenv from "dotenv";
dotenv.config();

import type { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt, { type JwtPayload } from "jsonwebtoken";
import helper from "@/helper/Helper";
import userRepository from "@/repository/UserRepository";

interface CustomJwtPayload extends JwtPayload {
	userId: number;
}

class AuthController {
	comparePassword = async (
		userInputPassword: string,
		databaseHashedPassword: string
	): Promise<boolean> => {
		return bcrypt.compare(userInputPassword, databaseHashedPassword);
	}

	login = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response> => {
		try {
			const user = await userRepository.findByUserName(req.body.username);

			if (!user) {
				return res
					.status(401)
					.json(helper.formatApiResponse(401, "Authentication failed"));
			}

			const isPasswordValid = await this.comparePassword(
				req.body.password,
				user.password
			);

			if (!isPasswordValid) {
				return res
					.status(401)
					.json(helper.formatApiResponse(401, "Authentication failed"));
			}

			const token = jwt.sign(
				{ userId: user.id },
				process.env.SECRET_KEY as string,
				{ expiresIn: "1h" }
			);

			return res
				.status(200)
				.json(
					helper.formatApiResponse(200, "Token generation successful", {
						token
					})
				);
		} catch (error) {
			return res
				.status(500)
				.json(helper.formatApiResponse(500, "Authentication failed"));
		}
	}

	refresh = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response> => {
		const token = req.header("Authorization");

		if (!token) {
			return res
				.status(401)
				.json(
					helper.formatApiResponse(
						401,
						"Access Denied. No refresh token provided."
					)
				);
		}

		try {
			const decoded = jwt.verify(
				token,
				process.env.SECRET_KEY as string
			) as CustomJwtPayload;

			const accessToken = jwt.sign(
				{ userId: decoded.userId },
				process.env.SECRET_KEY as string,
				{ expiresIn: "1h" }
			);

			return res
				.status(200)
				.json(
					helper.formatApiResponse(200, "Token generation successful", {
						token: accessToken,
					})
				);
		} catch (error) {
			return res
				.status(400)
				.json(helper.formatApiResponse(400, "Invalid refresh token."));
		}
	}
}

export default new AuthController();
