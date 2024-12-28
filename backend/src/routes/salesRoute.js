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

salesRouter.use(bodyParser.json());
salesRouter.use(bodyParser.urlencoded({ extended: true }));

salesRouter.get("/", verifyToken, isAdmin, getSales);
salesRouter.post("/", verifyToken, createSale);
salesRouter.get("/:saleId", verifyToken, isAdmin, getSaleById);

export default salesRouter;
