import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as authRepository from "../data/auth";
import { config } from "../config";

const AUTH_ERROR = { message: "Authentication Error" };

type DecodedT = { id: string };

declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
    token?: string;
  }
}

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.get("Authorization");
  if (!(authHeader && authHeader.startsWith("Bearer "))) {
    return res.status(401).json(AUTH_ERROR);
  }

  const token = authHeader.split(" ")[1];
  return (
    token &&
    jwt.verify(token, config.jwt.secretKey, async (error, decoded) => {
      if (error) {
        return res.status(401).json(AUTH_ERROR);
      } else {
        const decodedCopy = decoded as DecodedT;
        const user = await authRepository.getById(decodedCopy.id);
        if (!user) {
          return res.status(401).json(AUTH_ERROR);
        } else {
          req.userId = user.id;
          req.token = token;
        }
      }
      return next();
    })
  );
};
