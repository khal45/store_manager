import { logout } from "../controllers/logoutController.js";
import express from "express";

const logoutRouter = express.Router();
logoutRouter.get("/logout", logout);

export default logoutRouter;
