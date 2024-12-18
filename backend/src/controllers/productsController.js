import fs from "fs";
import idGenerator from "../../unique-id.js";
import products from "../database/productsDb.js";
import { fileURLToPath } from "url";
import path from "path";

const uniqueId = idGenerator();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "../../../frontend/views/products.html");

const getProducts = (req, res) => {
  res.sendFile(filePath);
};

const addProduct = (req, res) => {
  const { productName, productDescription, price, stock } = req.body;

  const newProduct = {
    id: uniqueId,
    productName: productName,
    description: productDescription,
    price: price,
    stock: Number(stock),
    time: new Date(),
  };
  products.push(newProduct);

  const filePath = path.join(__dirname, "../database/productsDb.js");
  const dataToWrite = `const products = ${JSON.stringify(
    products,
    null,
    2
  )};\n\nexport default products;`;

  fs.writeFileSync(filePath, dataToWrite);
  res.json({ message: "product added successfully" });
};

export { getProducts, addProduct };
