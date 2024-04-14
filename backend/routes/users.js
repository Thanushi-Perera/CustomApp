import express from "express";
import {
  deleteUser,
  getAllUser,
  getSingleUser,
  updatedUser,
} from "../controllers/userController.js";
const router = express.Router();

import { verifyUser } from "../utils/verifyToken.js";

//update user
router.post("/update", updatedUser);

//Delete user
router.delete("/:id", deleteUser);

//get sigle user
router.get("/:id", getSingleUser);

//get all users
router.get("/", getAllUser);

export default router;
