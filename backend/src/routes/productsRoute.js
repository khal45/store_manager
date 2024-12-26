import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";
import {
  getProducts,
  addProduct,
  getProductById,
} from "../controllers/productsController.js";
import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import bodyParser from "body-parser";

const productRouter = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

productRouter.use(
  express.static(path.join(__dirname, "../../../frontend/node_modules"))
);
productRouter.use(
  express.static(path.join(__dirname, "../../../frontend/public"))
);

productRouter.use(bodyParser.json());
productRouter.use(bodyParser.urlencoded({ extended: true }));

productRouter.get("/products", verifyToken, getProducts);
productRouter.post("/products", verifyToken, isAdmin, addProduct);
productRouter.get("/products/:id", verifyToken, getProductById);

export default productRouter;
