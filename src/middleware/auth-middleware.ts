import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const AccessTokenSecret = process.env.JWT_SECRET;

interface JwtPayloadWithId extends JwtPayload {
  id: string;
}

interface AuthenticatedRequest extends Request {
  user?: JwtPayloadWithId; 
}

const authenticateJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, AccessTokenSecret as string, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      if (typeof user === "object" && "id" in user) {
        req.user = user as JwtPayloadWithId; 
        next();
      } else {
        return res.sendStatus(403); 
      }
    });
  } else {
    res.sendStatus(401);
  }
};

export { authenticateJWT, AuthenticatedRequest };
