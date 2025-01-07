import "../middleware/authMiddleware.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";
import {
  getUser,
  getUserDb,
  createUser,
  getCurrentUser,
} from "../controllers/userController.js";
import { getAttendantSales } from "../controllers/salesController.js";
import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import bodyParser from "body-parser";

const userRouter = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware

userRouter.use(bodyParser.json());
userRouter.use(bodyParser.urlencoded({ extended: true }));

userRouter.get("/", verifyToken, isAdmin, getUser);
userRouter.get("/sales/:attendantId", verifyToken, getAttendantSales);
userRouter.get("/currentUser", verifyToken, getCurrentUser);
userRouter.get("/userDb", verifyToken, getUserDb);
userRouter.post("/register", verifyToken, isAdmin, createUser);

export default userRouter;
