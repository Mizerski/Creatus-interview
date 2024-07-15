import { Router } from "express";

import { UserModel } from "@/models/users/user-model";

import RoutePaths from "./paths";

const router = Router();

router.get(RoutePaths.GetUser, async (request, response) => {
  try {
    const { id } = request.params;
    const user = await UserModel.findById(id);

    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }

    response.status(200).json(user);
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "An unexpected error occurred" });
  }
});

export default router;
