import { v4 as uuidv4 } from "uuid";
import products from "../database/productsDb.js";
import { fileURLToPath } from "url";
import path from "path";

const uniqueId = uuidv4();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "../../../frontend/views/products.html");
const detailsPath = path.join(
  __dirname,
  "../../../frontend/views/product-details-page.html"
);

const getProducts = (req, res) => {
  res.sendFile(filePath);
};

const getProductDetails = (req, res) => {
  res.sendFile(detailsPath);
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
  res.json({ message: "product added successfully" });
};

const getProductById = (req, res) => {
  const { id } = req.params;
  const foundProduct = products.find((product) => product.id === id);

  if (!foundProduct) {
    return res.status(404).json({ message: "Product not found" });
  } else {
    res.json(foundProduct);
  }
};

export { getProducts, addProduct, getProductById, getProductDetails };
