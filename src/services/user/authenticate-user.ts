import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

import { UserModel } from "@/models/users/user-model";

dotenv.config();

const SECRET_KEY = process.env.SECRET || "default-secret-key";

export const authenticateUser = async (email: string, password: string) => {
  try {
    const user = await UserModel.findOne({ email }).exec();

    if (!user) {
      return { success: false, message: "Usuário não encontrado" };
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
        expiresIn: "1h",
      });
      return { success: true, token };
    } else {
      return { success: false, message: "Senha inválida" };
    }
  } catch (error) {
    console.error("Erro ao autenticar", error);
    return { success: false, message: "Erro ao autenticar usuario" };
  }
};
