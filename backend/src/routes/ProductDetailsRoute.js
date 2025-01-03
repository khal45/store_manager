import "../middleware/authMiddleware.js";
import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import bodyParser from "body-parser";
import { getProductDetails } from "../controllers/productDetailsController.js";

const productDetailsRouter = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware

productDetailsRouter.use(bodyParser.json());
productDetailsRouter.use(bodyParser.urlencoded({ extended: true }));

productDetailsRouter.get("/", getProductDetails);

export default productDetailsRouter;
