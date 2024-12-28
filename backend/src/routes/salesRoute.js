import "../middleware/authMiddleware.js";
import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import bodyParser from "body-parser";
import {
  getSales,
  createSale,
  getSaleById,
} from "../controllers/salesController.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";

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

salesRouter.get("/sales", verifyToken, isAdmin, getSales);
salesRouter.post("/sales", verifyToken, createSale);
salesRouter.get("/sales/:saleId", verifyToken, isAdmin, getSaleById);

export default salesRouter;
