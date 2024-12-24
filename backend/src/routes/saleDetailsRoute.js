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

saleDetailsRouter.use(
  express.static(path.join(__dirname, "../../../frontend/node_modules"))
);
saleDetailsRouter.use(
  express.static(path.join(__dirname, "../../../frontend/public"))
);

saleDetailsRouter.use(bodyParser.json());
saleDetailsRouter.use(bodyParser.urlencoded({ extended: true }));

saleDetailsRouter.get("/sale-detail", getSaleDetails);

export default saleDetailsRouter;
