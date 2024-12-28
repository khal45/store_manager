import "../middleware/authMiddleware.js";
import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import bodyParser from "body-parser";
import { getSaleDetails } from "../controllers/saleDetailsController.js";

const saleDetailsRouter = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware

saleDetailsRouter.use(bodyParser.json());
saleDetailsRouter.use(bodyParser.urlencoded({ extended: true }));

saleDetailsRouter.get("/", getSaleDetails);

export default saleDetailsRouter;
