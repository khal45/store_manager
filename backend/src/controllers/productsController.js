import { v4 as uuidv4 } from "uuid";
import products from "../database/productsDb.js";
import { fileURLToPath } from "url";
import path from "path";

const uniqueId = uuidv4();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const filePath = path.join(__dirname, "../../../frontend/views/products.html");
// const detailsPath = path.join(
//   __dirname,
//   "../../../frontend/views/product-details-page.html"
// );

const getProducts = (req, res) => {
  res.json(products);
};

// const getProductDetails = (req, res) => {
//   res.sendFile(detailsPath);
// };

const addProduct = (req, res) => {
  const { productName, productDescription, price, stock } = req.body;
  const requiredFields = [
    "productName",
    "productDescription",
    "price",
    "stock",
  ];

  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    res.status(422).json({
      success: false,
      message: "All fields are required",
    });
  } else {
    const newProduct = {
      id: uniqueId,
      productName: productName,
      description: productDescription,
      price: price,
      stock: Number(stock),
      time: new Date(),
    };
    products.push(newProduct);
    res.status(200).json({ message: "product added successfully" });
  }
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

export {
  getProducts,
  addProduct,
  getProductById,
  // getProductDetails
};
