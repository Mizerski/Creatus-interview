import { Router } from "express";

import { UserModel } from "@/models/users/user-model";
import RoutePaths from "./paths";

const router = Router();

router.get(RoutePaths.GetAllUsers, async (request, response) => {
  try {
    const page = parseInt(request.query.page as string) || 1;
    const limit = parseInt(request.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const filterOptions = request.query.name
      ? { name: request.query.name }
      : {};

    const fields = request.query.fields
      ? (request.query.fields as string).split(",")
      : [];

    const users = await UserModel.find(
      filterOptions,
      fields.length > 0 ? fields.join(" ") : null
    )
      .skip(skip)
      .limit(limit);

    response.status(200).json(users);
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "An unexpected error occurred" });
  }
});

export default router;
