import { Router } from "express";
import mongoose from "mongoose";

import { UserModel } from "@/models/users/user-model";
import RoutePaths from "./paths";

const router = Router();

router.put(RoutePaths.UpdateUser, async (request, response) => {
  const { id } = request.params;
  const { name, email, password } = request.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).json({ message: "Invalid user ID format" });
  }

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { name, email, password },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return response.status(404).json({ message: "User not found" });
    }

    response.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "An unexpected error occurred" });
  }
});

export default router;
