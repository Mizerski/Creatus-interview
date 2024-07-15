import { Request, Response, NextFunction } from "express";

import { UserModel } from "@/models/users/user-model";

async function checkUserExists(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { email } = request.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    return response.status(400).json({ message: "Email already in use." });
  }
  next();
}

export { checkUserExists };
