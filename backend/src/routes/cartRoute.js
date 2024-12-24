import "../middleware/authMiddleware.js";
import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import bodyParser from "body-parser";
import { getCart } from "../controllers/cartController.js";

const cartRouter = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware

cartRouter.use(
  express.static(path.join(__dirname, "../../../frontend/node_modules"))
);
cartRouter.use(
  express.static(path.join(__dirname, "../../../frontend/public"))
);

cartRouter.use(bodyParser.json());
cartRouter.use(bodyParser.urlencoded({ extended: true }));

cartRouter.get("/cart", getCart);

export default cartRouter;
