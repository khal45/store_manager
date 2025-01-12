import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";
import {
  getProducts,
  addProduct,
  getProductById,
  // getProductDetails,
} from "../controllers/productsController.js";
import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import bodyParser from "body-parser";

const productRouter = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

productRouter.use(bodyParser.json());
productRouter.use(bodyParser.urlencoded({ extended: true }));

productRouter.get("/", verifyToken, getProducts);
// productRouter.get("/product-details", verifyToken, getProductDetails);
productRouter.post("/", verifyToken, isAdmin, addProduct);
productRouter.get("/:id", verifyToken, getProductById);

export default productRouter;
