import sales from "../database/saleDb.js";
import { fileURLToPath } from "url";
import path from "path";
import { v4 as uuidv4 } from "uuid";
const uniqueId = uuidv4();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const salesPath = path.join(
  __dirname,
  "../../../frontend/views/sales-page.html"
);
const detailsPath = path.join(
  __dirname,
  "../../../frontend/views/sale-details.html"
);

const getSales = (req, res) => {
  res.sendFile(salesPath);
};

const getSaleById = (req, res) => {
  const { saleId } = req.params;
  const foundSaleRecord = sales.find((sale) => sale.saleId === saleId);
  const attendantId = req.user.id;
  if (!foundSaleRecord) {
    return res.status(404).json({ message: "Sale record not found" });
  } else {
    if (
      attendantId === foundSaleRecord.attendantId ||
      req.user.role === "Admin"
    ) {
      res.json(foundSaleRecord);
    } else {
      res
        .status(403)
        .json({ message: "Attendant does not have access to sale record" });
    }
  }
};

const createSale = (req, res) => {
  const { productName, quantity, paymentMethod, unitPrice, status } = req.body;
  const requiredFields = [
    "productName",
    "quantity",
    "paymentMethod",
    "unitPrice",
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
      paymentMethod,
      unitPrice,
      totalAmount: unitPrice * quantity,
      status,
      attendantId: req.user.id,
    };

    sales.push(newOrder);
    res.json(newOrder);
  }
};

export { getSales, createSale, getSaleById };
