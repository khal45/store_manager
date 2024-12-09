import "../middleware/authMiddleware.js";
import {
  getLogin,
  postLogin,
  createUser,
} from "../controllers/loginController.js";
import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

const loginRouter = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "../../../frontend/views/login.html");

// middleware

loginRouter.use(
  express.static(path.join(__dirname, "../../../frontend/node_modules"))
);
loginRouter.use(
  express.static(path.join(__dirname, "../../../frontend/public"))
);

loginRouter.use(bodyParser.json());
loginRouter.use(bodyParser.urlencoded({ extended: true }));

loginRouter.get("/", getLogin);
loginRouter.post("/", postLogin);
loginRouter.post("/register", createUser);

export default loginRouter;
