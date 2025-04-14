import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import helper from '../helper/helper';

interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload;
}

const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): Response | void => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json(helper.formatApiResponse(401, 'Authentication failed'));
  }

  jwt.verify(token, process.env.SECRET_KEY as string, (err, decoded) => {
    if (err) {
      return res.status(403).json(helper.formatApiResponse(403, 'Token is not valid'));
    }
    req.user = decoded;
    next();
  });
};

export default authenticateToken;
