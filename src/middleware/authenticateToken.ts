import jwt, { type JwtPayload } from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import helper from "@/helper/helper";

interface AuthenticatedRequest extends Request {
	user?: string | JwtPayload;
}

// Middleware with return type void
const authenticateToken = (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction,
): void => {
	const token = req.header("Authorization");
	if (!token) {
		res
			.status(401)
			.json(helper.formatApiResponse(401, "Authentication failed"));
		return;
	}

	jwt.verify(token, process.env.SECRET_KEY as string, (err, decoded) => {
		if (err) {
			res.status(403).json(helper.formatApiResponse(403, "Token is not valid"));
			return;
		}

		req.user = decoded;
		// Call next to continue processing the request
		next();
	});
};

export default authenticateToken;
