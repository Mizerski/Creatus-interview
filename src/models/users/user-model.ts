import mongoose from "mongoose";

import { COLLECTION_NAME } from "@/constants/collection-name";
import { IUser } from "@/interfaces/users/user-interface";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  level: { type: Number, default: 1, required: true, enum: [1, 2, 3, 4, 5] },
});

interface IUserModel extends IUser, Document {}

export const UserModel = mongoose.model<IUserModel>(
  COLLECTION_NAME,
  userSchema
);
