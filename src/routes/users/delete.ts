import { Router } from "express";

import { UserModel } from "@/models/users/user-model";
import RoutePaths from "./paths";

const router = Router();

router.delete(RoutePaths.DeleteUser, async (request, response) => {
  try {
    const { id } = request.params;
    const deletedUser = await UserModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return response.status(404).json({ message: "User not found" });
    }

    response
      .status(200)
      .json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "An unexpected error occurred" });
  }
});

export default router;
