import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import bodyParser from "body-parser";

const productRouter = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "../../../frontend/views/products.html");

productRouter.use(
  express.static(path.join(__dirname, "../../../frontend/node_modules"))
);
productRouter.use(
  express.static(path.join(__dirname, "../../../frontend/public"))
);

productRouter.use(bodyParser.json());
productRouter.use(bodyParser.urlencoded({ extended: true }));

productRouter
  .route("/products")
  .get((req, res) => {
    res.sendFile(filePath);
  })
  .post((req, res) => {
    console.log(req.body);
    res.send("data recieved");
  });

export default productRouter;
