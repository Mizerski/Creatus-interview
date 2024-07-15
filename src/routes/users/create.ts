import bcrypt from "bcrypt";
import { Router } from "express";

import RoutePaths from "./paths";

import { UserModel } from "@/models/users/user-model";
import { checkUserExists } from "@/middlewares/user/check-user";

const router = Router();

router.post(
  RoutePaths.CreateUser,
  checkUserExists,
  async (request, response) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(request.body.password, salt);

      const user = new UserModel({
        name: request.body.name,
        email: request.body.email,
        password: hashedPassword,
        level: request.body.level,
      });

      await user.save();

      response.status(201).send(user);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        response.status(400).json({ message: error.message });
      } else {
        response.status(500).json({ message: "An unexpected error occurred" });
      }
    }
  }
);

export default router;
