import { UserModel } from "@/models/users/user-model";
import { NextFunction, Request, Response } from "express";

export const requireLevelFive = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user || user.level !== 5) {
      return res.status(403).send("Acesso negado. Nível 5 é necessário.");
    }
    next();
  } catch (error) {
    return res.status(500).send("Erro ao verificar o nível do usuário");
  }
};
