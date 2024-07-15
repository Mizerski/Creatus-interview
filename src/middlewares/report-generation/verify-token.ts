import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET;

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(403).send("Um token é necessário para autenticação");
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY || "") as { userId: string };
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).send("Token inválido");
  }
};
