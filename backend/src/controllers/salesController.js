import sales from "../database/saleDb.js";
import { fileURLToPath } from "url";
import path from "path";
import { v4 as uuidv4 } from "uuid";
const uniqueId = uuidv4();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(
  __dirname,
  "../../../frontend/views/sales-page.html"
);

const getSales = (req, res) => {
  res.sendFile(filePath);
};

const getSaleById = (req, res) => {
  const { saleId } = req.params;
  const foundSaleRecord = sales.find((sale) => sale.saleId === saleId);

  if (!foundSaleRecord) {
    return res.status(404).json({ message: "Sale record not found" });
  } else {
    res.json(foundSaleRecord);
  }
};

const createSale = (req, res) => {
  const { productName, quantity, totalAmount, paymentMethod, status } =
    req.body;

  const requiredFields = [
    "productName",
    "quantity",
    "totalAmount",
    "paymentMethod",
    "status",
  ];
  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    res.status(422).json({
      success: false,
      message: "All fields are required",
    });
  } else {
    let newOrder = {
      productName,
      saleId: uniqueId,
      date: new Date().toDateString(),
      quantity,
      totalAmount,
      paymentMethod,
      status,
    };

    sales.push(newOrder);
    res.json(newOrder);
  }
};

export { getSales, createSale, getSaleById };
