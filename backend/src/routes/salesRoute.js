import "../middleware/authMiddleware.js";
import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import bodyParser from "body-parser";
import { getSales } from "../controllers/salesController.js";

const salesRouter = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware

salesRouter.use(
  express.static(path.join(__dirname, "../../../frontend/node_modules"))
);
salesRouter.use(
  express.static(path.join(__dirname, "../../../frontend/public"))
);

salesRouter.use(bodyParser.json());
salesRouter.use(bodyParser.urlencoded({ extended: true }));

salesRouter.get("/sales", getSales);

export default salesRouter;
