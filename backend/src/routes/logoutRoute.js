import { logout } from "../controllers/logoutController.js";
import express from "express";

const logoutRouter = express.Router();
logoutRouter.get("/", logout);

export default logoutRouter;
