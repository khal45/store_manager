import "../middleware/authMiddleware.js";
import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import bodyParser from "body-parser";
import {
  getAllSales,
  createSale,
  getSaleById,
} from "../controllers/salesController.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";

const salesRouter = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

salesRouter.use(bodyParser.json());
salesRouter.use(bodyParser.urlencoded({ extended: true }));

salesRouter.get("/", verifyToken, isAdmin, getAllSales);
salesRouter.post("/", verifyToken, createSale);
salesRouter.get("/:saleId", verifyToken, getSaleById);

export default salesRouter;
