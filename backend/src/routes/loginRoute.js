import "../middleware/authMiddleware.js";
import { getLogin, postLogin } from "../controllers/loginController.js";
import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

const loginRouter = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

export default loginRouter;
